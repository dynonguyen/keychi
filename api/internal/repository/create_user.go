package repository

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/entity"
)

func (s *pgsqlStorage) CreateUser(ctx context.Context, user *entity.User) error {
	if err := s.db.Create(user).Error; err != nil {
		return err
	}

	return nil
}
