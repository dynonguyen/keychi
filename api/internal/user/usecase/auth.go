package usecase

import (
	"context"
	"errors"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/util"
)

type authUsecase struct {
	authSvc service.AuthService
}

var (
	codeInvalidUser common.I18nCode = "INVALID_USER"
)

func (uc *authUsecase) Login(ctx context.Context, user *dto.UserLoginInput) (*dto.UserToken, error) {
	validate := util.GetValidator()

	if err := validate.Struct(user); err != nil {
		return nil, common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	userToken, err := uc.authSvc.GetUserToken(ctx, user.Email, user.Password)

	if err != nil || (userToken != nil && userToken.AccessToken == "") {
		return nil, common.NewUnauthorizedError(errors.New("invalid user or password"), codeInvalidUser)
	}

	return userToken, nil
}

func (uc *authUsecase) Logout(ctx context.Context, token string) error {
	if token == "" {
		return common.NewBadRequestError(errors.New("Token not found"), common.CodeBadRequestError)
	}

	if err := uc.authSvc.Logout(ctx, token); err != nil {
		return common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	return nil
}

func NewAuthUsecase(authSvc service.AuthService) *authUsecase {
	return &authUsecase{authSvc: authSvc}
}
