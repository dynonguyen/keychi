package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/repository"
	"github.com/dynonguyen/keychi/api/internal/util"
)

type registerUserUsecase struct {
	txm     common.TransactionManager
	repo    repository.RegisterUserRepository
	authSvc service.AuthService
}

func (uc *registerUserUsecase) RegisterUser(ctx context.Context, user *dto.UserRegistrationInput) error {
	validate := util.GetValidator()

	if err := validate.Struct(user); err != nil {
		return common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	return uc.txm.WithTransaction(func() error {
		userId, err := uc.repo.InsertUser(ctx, user)

		if err != nil {
			return err
		}

		if err := uc.repo.CreateDefaultUserPreferences(ctx, userId); err != nil {
			return err
		}

		if err := uc.authSvc.CreateUser(ctx, user); err != nil {
			return err
		}

		return nil
	})
}

func NewRegisterUserUsecase(txm common.TransactionManager, repo repository.RegisterUserRepository, authSvc service.AuthService) *registerUserUsecase {
	return &registerUserUsecase{
		txm:     txm,
		repo:    repo,
		authSvc: authSvc,
	}
}
