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
	CodeUserNotFound common.I18nCode = "USER_NOT_FOUND"
)

func (uc *profileUsecase) GetUserProfile(ctx context.Context, id int) (*dto.UserProfile, error) {
	user, err := uc.repo.FindUserById(ctx, id)
	if err != nil || user == nil {
		return nil, common.NewBadRequestError(err, CodeUserNotFound)
	}

	preferences, err := uc.repo.FindUserPreferencesByUserId(ctx, id)
	if err != nil || preferences == nil {
		return nil, common.NewBadRequestError(err, codePreferencesNotFound)
	}

	return &dto.UserProfile{UserModel: *user, Preferences: *preferences}, nil
}

func NewProfileUsecase(repo repository.ProfileRepository) *profileUsecase {
	return &profileUsecase{repo: repo}
}
