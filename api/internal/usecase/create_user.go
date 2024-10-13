package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/entity"
)

type CreateUserRepository interface {
	CreateUser(ctx context.Context, user *entity.User) error
}

type CreateUserUsecase struct {
	userRepo CreateUserRepository
}

func NewCreateUserUsecase(userRepo CreateUserRepository) *CreateUserUsecase {
	return &CreateUserUsecase{
		userRepo: userRepo,
	}
}

func (uc *CreateUserUsecase) CreateUser(ctx context.Context, user *entity.User) error {
	if err := user.Validate(); err != nil {
		return err
	}

	if err := uc.userRepo.CreateUser(ctx, user); err != nil {
		return err
	}

	return nil
}
