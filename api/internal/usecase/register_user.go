package usecase

import (
	"context"

	"github.com/go-playground/validator/v10"
)

type UserRegistration struct {
	Name     string `json:"name" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
	PwdHint  string `json:"pwdHint"`
}

type RegisterUserRepository interface {
	RegisterUser(ctx context.Context, user *UserRegistration) error
}

type RegisterUserUsecase struct {
	repo RegisterUserRepository
}

func (uc *RegisterUserUsecase) RegisterUser(ctx context.Context, user *UserRegistration) error {
	validate := validator.New(validator.WithRequiredStructEnabled())

	if err := validate.Struct(user); err != nil {
		return err
	}

	if err := uc.repo.RegisterUser(ctx, user); err != nil {
		return err
	}

	return nil
}

func NewRegisterUserUC(repo RegisterUserRepository) *RegisterUserUsecase {
	return &RegisterUserUsecase{
		repo: repo,
	}
}
