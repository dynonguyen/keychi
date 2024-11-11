package usecase

import (
	"context"
	"errors"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
)

type loginUsecase struct {
	authSvc service.AuthService
}

var (
	codeInvalidUser common.I18nCode = "INVALID_USER"
)

func (uc *loginUsecase) Login(ctx context.Context, user *dto.UserLoginInput) (*dto.UserToken, error) {
	userToken, err := uc.authSvc.GetUserToken(ctx, user.Email, user.Password)

	if err != nil || (userToken != nil && userToken.AccessToken == "") {
		return nil, common.NewUnauthorizedError(errors.New("invalid user or password"), codeInvalidUser)
	}

	return userToken, nil
}

func NewLoginUsecase(authSvc service.AuthService) *loginUsecase {
	return &loginUsecase{authSvc: authSvc}
}
