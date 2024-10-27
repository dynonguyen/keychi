package postgres

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/user/model"
)

type loginRepository struct {
	storage *infra.PgsqlStorage
}

func (r *loginRepository) FindUserByEmail(ctx context.Context, email string) (*model.UserModel, error) {
	return nil, nil
}

func NewLoginRepository(s *infra.PgsqlStorage) *loginRepository {
	return &loginRepository{
		storage: s,
	}
}
