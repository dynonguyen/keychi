package repository

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/model"
)

type RegisterUserRepository interface {
	InsertUser(ctx context.Context, user *dto.UserRegistrationInput) (error, int)
	CreateDefaultUserSettings(ctx context.Context, userId int) error
}

type UserInfoRepository interface {
	FindUserByEmail(ctx context.Context, email string) (*model.UserModel, error)
}
