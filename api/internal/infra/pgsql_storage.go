package infra

import (
	"fmt"

	"gorm.io/gorm"
)

// ------------------------
type PgsqlStorage struct {
	DB *gorm.DB
	Tx *gorm.DB
}

func (s *PgsqlStorage) WithTransaction(execute func() error) error {
	var err error

	s.Tx = s.DB.Begin()

	defer func() {
		rollback := func() {
			if rbErr := s.Tx.Rollback().Error; rbErr != nil {
				fmt.Println("Error on rollback transaction: ", rbErr)
			}
			s.Tx = nil
		}

		if err != nil {
			rollback()
			return
		}

		if r := recover(); r != nil {
			rollback()
			panic(r)
		}

		if cmErr := s.Tx.Commit().Error; cmErr != nil {
			fmt.Println("Error on commit transaction: ", cmErr)
		}

		s.Tx = nil
	}()

	err = execute()

	return err
}

// Returns the current transaction if it exists, otherwise return the default DB instance
func (s *PgsqlStorage) GetInstance() *gorm.DB {
	if s.Tx != nil {
		return s.Tx
	}

	return s.DB
}

func NewPgsqlStorage(db *gorm.DB) *PgsqlStorage {
	return &PgsqlStorage{DB: db}
}
