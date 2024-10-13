package usecase

import (
	"context"
	"testing"

	"github.com/dynonguyen/keychi/api/internal/entity"
)

type mockRepository struct{}

func (mockRepository) CreateUser(ctx context.Context, user *entity.User) error {
	return nil
}

func TestCreateUser(t *testing.T) {
	testCases := []struct {
		user      *entity.User
		expectErr error
	}{
		{
			user: &entity.User{
				ID:    1,
				Name:  "",
				Email: "email@domain.com",
			},
			expectErr: entity.ErrNameIsRequired,
		},
		{
			user: &entity.User{
				ID:    1,
				Name:  "Keychi",
				Email: "",
			},
			expectErr: entity.ErrEmailIsRequired,
		},
		{
			user: &entity.User{
				ID:    1,
				Name:  "Keychi",
				Email: "email@domain.com",
			},
			expectErr: nil,
		},
	}

	repo := mockRepository{}
	uc := NewCreateUserUsecase(repo)

	for _, tc := range testCases {
		if err := uc.CreateUser(context.Background(), tc.user); err != tc.expectErr {
			t.Errorf("expected error: %v, got: %v", tc.expectErr, err)
		}
	}
}
