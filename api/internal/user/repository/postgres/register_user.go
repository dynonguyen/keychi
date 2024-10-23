package postgres

import (
	"context"

	"keychi.org/api/internal/infra"
	"keychi.org/api/internal/user/dto"
	"keychi.org/api/internal/user/repository"
)

type registerUserRepo struct {
	storage *infra.PgsqlStorage
}

func (r *registerUserRepo) RegisterUser(ctx context.Context, user *dto.UserRegistration) error {
	// Implement the logic to register a user
	return nil
}

func NewRegisterUserRepo(s *infra.PgsqlStorage) repository.RegisterUserRepository {
	return &registerUserRepo{storage: s}
}
