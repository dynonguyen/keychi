package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/repository"
)

type loginUsecase struct {
	repo    repository.LoginRepository
	authSvc service.AuthService
}

func (uc *loginUsecase) Login(ctx context.Context, user *dto.UserLoginInput) error {
	userToken, err := uc.authSvc.GetUserToken(ctx, user.Email, user.Password)

	if err != nil || (userToken != nil && userToken.AccessToken == "") {
		return common.NewUnauthorizedError(err, common.CodeUnauthorizedError)
	}

	return nil
}

func NewLoginUsecase(repo repository.LoginRepository, authSvc service.AuthService) *loginUsecase {
	return &loginUsecase{
		repo:    repo,
		authSvc: authSvc,
	}
}
