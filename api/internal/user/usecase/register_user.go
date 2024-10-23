package usecase

import (
	"context"

	"github.com/go-playground/validator/v10"
	"keychi.org/api/internal/user/dto"
	"keychi.org/api/internal/user/repository"
)

type RegisterUserUsecase struct {
	repo repository.RegisterUserRepository
}

func (uc *RegisterUserUsecase) RegisterUser(ctx context.Context, user *dto.UserRegistration) error {
	validate := validator.New(validator.WithRequiredStructEnabled())

	if err := validate.Struct(user); err != nil {
		return err
	}

	if err := uc.repo.RegisterUser(ctx, user); err != nil {
		return err
	}

	return nil
}

func NewRegisterUserUsecase(repo repository.RegisterUserRepository) *RegisterUserUsecase {
	return &RegisterUserUsecase{
		repo: repo,
	}
}
