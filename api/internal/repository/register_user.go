package repository

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/usecase"
)

func (s *pgsqlStorage) RegisterUser(ctx context.Context, user *usecase.UserRegistration) error {
	if err := s.db.Create(user).Error; err != nil {
		return err
	}

	return nil
}
