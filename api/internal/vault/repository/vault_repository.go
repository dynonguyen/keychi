package repository

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/vault/dto"
	"github.com/dynonguyen/keychi/api/internal/vault/model"
)

type VaultRepository interface {
	InsertVault(ctx context.Context, userID int, vault *dto.NewVaultInput) (int, error)
	FindAllVaults(ctx context.Context, userID int) ([]model.Vault, error)
	DeleteVault(ctx context.Context, userID, vaultID int) error
}
