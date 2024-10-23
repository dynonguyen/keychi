package postgres

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/repository"
)

type registerUserRepo struct {
	storage *infra.PgsqlStorage
}

func (r *registerUserRepo) InsertUser(ctx context.Context, user *dto.UserRegistration) error {
	// TODO: Implement the logic to register a user

	return nil
}

func NewRegisterUserRepo(s *infra.PgsqlStorage) repository.RegisterUserRepository {
	return &registerUserRepo{storage: s}
}
