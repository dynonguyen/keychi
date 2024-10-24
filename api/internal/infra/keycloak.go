package infra

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/user/dto"
)

type keycloakAuthService struct{}

func (k *keycloakAuthService) CreateUser(ctx context.Context, user *dto.UserRegistrationInput) error {
	return nil
}

func NewKeycloakAuthService() *keycloakAuthService {
	return &keycloakAuthService{}
}
