package postgres

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/util"
	"github.com/dynonguyen/keychi/api/internal/vault/dto"
	"github.com/dynonguyen/keychi/api/internal/vault/model"
)

type vaultRepository struct {
	storage *infra.PgsqlStorage
}

func (r *vaultRepository) InsertVault(ctx context.Context, userID int, vault *dto.NewVaultInput) (int, error) {
	db := r.storage.GetInstance()

	inserted := &model.Vault{
		UserID:       userID,
		FolderID:     vault.FolderID,
		Name:         vault.Name,
		Type:         vault.Type,
		Properties:   util.StructToMap(vault.Properties),
		CustomFields: vault.CustomFields,
		Note:         vault.Note,
		Deleted:      false,
	}

	if err := db.Create(inserted).Error; err != nil {
		return common.FailedCreationId, common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return inserted.ID, nil
}

func NewVaultRepository(storage *infra.PgsqlStorage) *vaultRepository {
	return &vaultRepository{storage: storage}
}
