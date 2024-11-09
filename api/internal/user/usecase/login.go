package usecase

import (
	"context"
	"errors"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/repository"
)

type loginUsecase struct {
	repo    repository.LoginRepository
	authSvc service.AuthService
}

var (
	ErrInvalidUser = errors.New("invalid user or password")
)

func (uc *loginUsecase) Login(ctx context.Context, user *dto.UserLoginInput) (*dto.UserToken, error) {
	userToken, err := uc.authSvc.GetUserToken(ctx, user.Email, user.Password)

	if err != nil {
		return nil, common.NewUnauthorizedError(err, common.CodeUnauthorizedError)
	}

	if userToken != nil && userToken.AccessToken == "" {
		return nil, common.NewUnauthorizedError(ErrInvalidUser, common.CodeUnauthorizedError)
	}

	return userToken, nil
}

func NewLoginUsecase(repo repository.LoginRepository, authSvc service.AuthService) *loginUsecase {
	return &loginUsecase{
		repo:    repo,
		authSvc: authSvc,
	}
}
