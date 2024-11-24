package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/repository"
)

type profileUsecase struct {
	repo repository.ProfileRepository
}

var (
	codeUserNotFound        common.I18nCode = "USER_NOT_FOUND"
	codePreferencesNotFound common.I18nCode = "PREFERENCES_NOT_FOUND"
)

func (uc *profileUsecase) GetUserProfile(ctx context.Context, id int) (*dto.UserProfile, error) {
	user, err := uc.repo.FindUserById(ctx, id)
	preferences, err := uc.repo.FindUserPreferencesByUserId(ctx, id)

	if err != nil || user == nil || preferences == nil {
		return nil, common.NewBadRequestError(err, codeUserNotFound)
	}

	return &dto.UserProfile{UserModel: *user, Preferences: *preferences}, nil
}

func (uc *profileUsecase) UpdateUserPreferences(ctx context.Context, id int, preferences *dto.UserPreferencesInput) error {

	err := uc.repo.UpdateUserPreferencesByUserId(ctx, id, preferences)

	if err != nil {
		return common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	return nil
}

func NewProfileUsecase(repo repository.ProfileRepository) *profileUsecase {
	return &profileUsecase{repo: repo}
}
