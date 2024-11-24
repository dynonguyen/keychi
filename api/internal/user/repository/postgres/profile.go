package postgres

import (
	"context"
	"fmt"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/model"
)

type profileRepository struct {
	storage *infra.PgsqlStorage
}

var (
	codeUserNotFound common.I18nCode = "USER_NOT_FOUND"
)

func (r *profileRepository) FindUserById(ctx context.Context, id int) (*model.UserModel, error) {
	db := r.storage.DB
	var user model.UserModel = model.UserModel{ID: id}

	result := db.Take(&user)
	if result.Error != nil {
		return nil, common.NewBadRequestError(result.Error, codeUserNotFound)
	}

	return &user, nil
}

func (r *profileRepository) FindUserPreferencesByUserId(ctx context.Context, userId int) (*model.UserPreferencesModel, error) {
	db := r.storage.DB
	var preferences model.UserPreferencesModel

	result := db.Where("user_id = ?", userId).Take(&preferences)
	if result.Error != nil {
		return nil, common.NewBadRequestError(result.Error, codeUserNotFound)
	}

	return &preferences, nil
}

func (r *profileRepository) UpdateUserPreferencesByUserId(ctx context.Context, userId int, preferences *dto.UserPreferencesInput) error {
	db := r.storage.DB

	properties, err := preferences.ParseProperties()
	if err != nil {
		return common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	fmt.Println(properties)

	result := db.Model(&model.UserPreferencesModel{}).Where("user_id = ?", userId).Updates(properties)
	if result.Error != nil {
		return common.NewBadRequestError(result.Error, codeUserNotFound)
	}

	return nil
}

func NewProfileRepository(s *infra.PgsqlStorage) *profileRepository {
	return &profileRepository{storage: s}
}
