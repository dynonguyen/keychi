package repository

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/user/dto"
)

type RegisterUserRepository interface {
	InsertUser(ctx context.Context, user *dto.UserRegistrationInput) error
}
