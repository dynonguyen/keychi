package postgres

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/user/model"
)

type userInfoRepository struct {
	storage *infra.PgsqlStorage
}

func (r *userInfoRepository) FindUserByEmail(ctx context.Context, email string) (*model.UserModel, error) {
	db := r.storage.DB
	var user model.UserModel

	result := db.Where("email = ?", email).Take(&user)
	if result.Error != nil {
		return nil, common.NewBadRequestError(result.Error, "USER_NOT_FOUND")
	}

	return &user, nil
}

func NewUserInfoRepository(s *infra.PgsqlStorage) *userInfoRepository {
	return &userInfoRepository{
		storage: s,
	}
}
