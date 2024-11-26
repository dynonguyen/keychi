package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/util"
	"github.com/dynonguyen/keychi/api/internal/vault/dto"
	"github.com/dynonguyen/keychi/api/internal/vault/entity"
	"github.com/dynonguyen/keychi/api/internal/vault/repository"
)

type createVaultUsecase struct {
	repo repository.VaultRepository
}

func (uc *createVaultUsecase) CreateVault(ctx context.Context, userID int, vault *dto.NewVaultInput) (int, error) {
	validate := util.GetValidator()

	if err := validate.Struct(vault); err != nil {
		return common.FailedCreationId, common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	vaultEntity := entity.Vault{Type: vault.Type, Properties: vault.Properties, CustomFields: vault.CustomFields}

	if err := vaultEntity.ValidateProperties(); err != nil {
		return common.FailedCreationId, common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	parsedProps, err := vaultEntity.ParseProperties()

	if err != nil {
		return common.FailedCreationId, common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	vault.Properties = *parsedProps

	return uc.repo.InsertVault(ctx, userID, vault)
}

func NewCreateVaultUsecase(repo repository.VaultRepository) *createVaultUsecase {
	return &createVaultUsecase{repo: repo}
}
