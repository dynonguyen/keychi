package postgres

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/user/model"
)

type profileRepository struct {
	storage *infra.PgsqlStorage
}

var (
	codeUserNotFound common.I18nCode = "USER_NOT_FOUND"
)

func (r *profileRepository) FindUserById(ctx context.Context, id int) (*model.UserModel, error) {
	db := r.storage.GetInstance(ctx)
	var user model.UserModel = model.UserModel{ID: id}

	result := db.Take(&user)
	if result.Error != nil {
		return nil, common.NewBadRequestError(result.Error, codeUserNotFound)
	}

	return &user, nil
}

func (r *profileRepository) FindUserPreferencesByUserId(ctx context.Context, userId int) (*model.UserPreferencesModel, error) {
	db := r.storage.GetInstance(ctx)
	var preferences model.UserPreferencesModel

	result := db.Where("user_id = ?", userId).Take(&preferences)
	if result.Error != nil {
		return nil, common.NewBadRequestError(result.Error, codeUserNotFound)
	}

	return &preferences, nil
}

func (r *profileRepository) UpdateUserPreferencesByUserId(ctx context.Context, userId int, properties interface{}) error {
	db := r.storage.GetInstance(ctx)

	if err := db.Model(&model.UserPreferencesModel{}).Where("user_id = ?", userId).Updates(properties).Error; err != nil {
		return common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return nil
}

func NewProfileRepository(s *infra.PgsqlStorage) *profileRepository {
	return &profileRepository{storage: s}
}
