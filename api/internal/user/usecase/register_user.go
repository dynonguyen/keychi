package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/repository"
	"github.com/go-playground/validator/v10"
)

type RegisterUserUsecase struct {
	repo        repository.RegisterUserRepository
	authService service.AuthService
}

func (uc *RegisterUserUsecase) RegisterUser(ctx context.Context, user *dto.UserRegistration) error {
	validate := validator.New(validator.WithRequiredStructEnabled())

	if err := validate.Struct(user); err != nil {
		return err
	}

	if err := uc.repo.InsertUser(ctx, user); err != nil {
		return err
	}

	if err := uc.authService.CreateUser(ctx, user); err != nil {
		return err
	}

	return nil
}

func NewRegisterUserUsecase(repo repository.RegisterUserRepository, authService service.AuthService) *RegisterUserUsecase {
	return &RegisterUserUsecase{
		repo:        repo,
		authService: authService,
	}
}
