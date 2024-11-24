package repository

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/vault/dto"
)

type VaultRepository interface {
	InsertVault(ctx context.Context, userID int, vault *dto.NewVaultInput) (int, error)
}
