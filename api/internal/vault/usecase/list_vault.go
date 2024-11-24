package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/vault/model"
	"github.com/dynonguyen/keychi/api/internal/vault/repository"
)

type listVaultUsecase struct {
	repo repository.VaultRepository
}

func (uc *listVaultUsecase) ListVault(ctx context.Context, userID int) ([]model.Vault, error) {
	vaults, err := uc.repo.FindAllVaults(ctx, userID)

	if err != nil {
		return nil, common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return vaults, nil
}

func NewListVaultUsecase(repo repository.VaultRepository) *listVaultUsecase {
	return &listVaultUsecase{repo: repo}
}
