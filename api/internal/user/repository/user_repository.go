package repository

import (
	"context"

	"keychi.org/api/internal/user/dto"
)

type RegisterUserRepository interface {
	RegisterUser(ctx context.Context, user *dto.UserRegistration) error
}
