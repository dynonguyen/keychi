package infra

import (
	"context"

	"gorm.io/gorm"
)

// ------------------------
type PgsqlStorage struct {
	DB *gorm.DB
}

type txCtxKey string

const txKey txCtxKey = "tx"

func (s *PgsqlStorage) WithTransaction(ctx context.Context, execute func(txCtx context.Context) error) error {
	return s.DB.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		txCtx := context.WithValue(ctx, txKey, tx)

		return execute(txCtx)
	})
}

// Returns the current transaction if it exists, otherwise return the default DB instance
func (s *PgsqlStorage) GetInstance(ctx context.Context) *gorm.DB {
	tx, ok := ctx.Value(txKey).(*gorm.DB)

	if ok && tx != nil {
		return tx
	}

	return s.DB
}

func NewPgsqlStorage(db *gorm.DB) *PgsqlStorage {
	return &PgsqlStorage{DB: db}
}
