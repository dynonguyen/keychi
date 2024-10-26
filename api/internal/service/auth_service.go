package service

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/user/dto"
)

type AuthService interface {
	CreateUser(ctx context.Context, user *dto.UserRegistrationInput) error
}
