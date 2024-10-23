package infra

import (
	"gorm.io/gorm"
)

type PgsqlStorage struct {
	DB *gorm.DB
}

func NewPgsqlStorage(db *gorm.DB) *PgsqlStorage {
	return &PgsqlStorage{DB: db}
}
