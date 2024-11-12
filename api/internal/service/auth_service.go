package service

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/user/dto"
)

type TokenInfo struct {
	Active bool   `json:"active"`
	Email  string `json:"email"`
}

type AuthService interface {
	CreateUser(ctx context.Context, user *dto.UserRegistrationInput) error
	GetUserToken(ctx context.Context, email string, password string) (*dto.UserToken, error)
	DecodeToken(ctx context.Context, token string) (*TokenInfo, error)
	Logout(ctx context.Context, token string) error
}
