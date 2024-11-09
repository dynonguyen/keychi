package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/repository"
)

type getUserUsecase struct {
	repo repository.UserInfoRepository
}

var (
	codeUserNodFound common.I18nCode = "USER_NOT_FOUND"
)

func (uc *getUserUsecase) GetUser(ctx context.Context, email string) (*dto.UserInfo, error) {
	user, err := uc.repo.FindUserByEmail(ctx, email)

	if err != nil || user == nil {
		return nil, common.NewBadRequestError(err, codeUserNodFound)
	}

	return &dto.UserInfo{
		ID:     user.ID,
		Name:   user.Name,
		Email:  user.Email,
		Avatar: user.Avatar,
	}, nil
}

func NewGetUserUsecase(repo repository.UserInfoRepository) *getUserUsecase {
	return &getUserUsecase{
		repo: repo,
	}
}
