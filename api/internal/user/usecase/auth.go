package usecase

import (
	"context"
	"errors"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/entity"
	"github.com/dynonguyen/keychi/api/internal/user/repository"
	"github.com/dynonguyen/keychi/api/internal/util"
)

type authUsecase struct {
	authSvc service.AuthService
	repo    repository.AuthRepository
}

var (
	codeInvalidUser common.I18nCode = "INVALID_USER"
)

func (uc *authUsecase) PreLogin(ctx context.Context, data *dto.PreLoginInput) (*dto.PreLoginResponse, error) {
	validate := util.GetValidator()

	if err := validate.Struct(data); err != nil {
		return nil, common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	preLogin, err := uc.repo.FindPreLoginSettingByEmail(ctx, data.Email)
	defaultSetting := entity.DefaultUserSetting

	if err != nil {
		return &dto.PreLoginResponse{
			KdfAlgorithm:   defaultSetting.KdfAlgorithm,
			KdfIterations:  defaultSetting.KdfIterations,
			KdfMemory:      defaultSetting.KdfMemory,
			KdfParallelism: defaultSetting.KdfParallelism,
		}, nil
	}

	return preLogin, nil
}

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

func NewAuthUsecase(authSvc service.AuthService, repo repository.AuthRepository) *authUsecase {
	return &authUsecase{authSvc: authSvc, repo: repo}
}
