package repository

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/model"
)

type RegisterUserRepository interface {
	InsertUser(ctx context.Context, user *dto.UserRegistrationInput) (int, error)
	CreateDefaultUserPreferences(ctx context.Context, userId int) error
}

type ProfileRepository interface {
	FindUserById(ctx context.Context, id int) (*model.UserModel, error)
	FindUserPreferencesByUserId(ctx context.Context, userId int) (*model.UserPreferencesModel, error)
	UpdateUserPreferencesByUserId(ctx context.Context, userId int, properties interface{}) error
}
