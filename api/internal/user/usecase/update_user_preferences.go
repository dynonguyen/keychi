package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/repository"
)

type UpdateUserPreferencesUseCase struct {
	repo repository.ProfileRepository
}

var (
	codePreferencesNotFound common.I18nCode = "PREFERENCES_NOT_FOUND"
)

func (uc *profileUsecase) UpdateUserPreferences(ctx context.Context, id int, preferences *dto.UserPreferencesInput) error {

	properties, err := preferences.ToMap()

	if err != nil {
		return common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	err = uc.repo.UpdateUserPreferencesByUserId(ctx, id, properties)

	if err != nil {
		return common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	return nil
}

func NewUpdateUserPreferencesUseCase(repo repository.ProfileRepository) *profileUsecase {
	return &profileUsecase{repo: repo}
}
