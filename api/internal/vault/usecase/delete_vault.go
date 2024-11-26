package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/vault/repository"
)

type deleteVaultUsecase struct {
	repo repository.VaultRepository
}

func (u *deleteVaultUsecase) DeleteVault(ctx context.Context, userID, vaultID int) error {
	return u.repo.DeleteVault(ctx, userID, vaultID)
}

func NewDeleteVaultUsecase(repo repository.VaultRepository) *deleteVaultUsecase {
	return &deleteVaultUsecase{repo: repo}
}
