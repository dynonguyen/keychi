package repository

import "gorm.io/gorm"

type pgsqlStorage struct {
	db *gorm.DB
}

func NewPgsqlStorage(db *gorm.DB) *pgsqlStorage {
	return &pgsqlStorage{db: db}
}
