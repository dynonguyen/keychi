package mock

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
)

type mockAuthService struct{}

func (m *mockAuthService) CreateUser(ctx context.Context, user *dto.UserRegistrationInput) error {
	return nil
}

func (m *mockAuthService) GetUserToken(ctx context.Context, email string, password string) (*dto.UserToken, error) {
	return nil, nil
}

func (m *mockAuthService) DecodeToken(ctx context.Context, token string) (*service.TokenInfo, error) {
	return nil, nil
}

func (m *mockAuthService) Logout(ctx context.Context, token string) error {
	return nil
}

func NewMockAuthService() *mockAuthService {
	return &mockAuthService{}
}
