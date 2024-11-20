package postgres

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/model"
)

type authRepo struct {
	storage *infra.PgsqlStorage
}

func (repo *authRepo) FindPreLoginSettingByEmail(ctx context.Context, email string) (*dto.PreLoginResponse, error) {
	db := repo.storage.GetInstance()

	var uSetting model.UserSettingModel
	result := db.Table("settings").Joins("INNER JOIN users ON users.id = settings.user_id").Where("users.email = ?", email).First(&uSetting)

	if result.Error != nil {
		return nil, result.Error
	}

	return &dto.PreLoginResponse{
		KdfAlgorithm:   uSetting.KdfAlgorithm,
		KdfIterations:  uSetting.KdfIterations,
		KdfMemory:      uSetting.KdfMemory,
		KdfParallelism: uSetting.KdfParallelism,
	}, nil
}

func NewAuthRepo(storage *infra.PgsqlStorage) *authRepo {
	return &authRepo{storage: storage}
}
