package postgres

import (
	"context"
	"errors"
	"time"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/vault/dto"
	"github.com/dynonguyen/keychi/api/internal/vault/entity"
	"github.com/dynonguyen/keychi/api/internal/vault/model"
)

type vaultRepository struct {
	storage *infra.PgsqlStorage
}

func (r *vaultRepository) InsertVault(ctx context.Context, userID int, vault *dto.NewVaultInput) (int, error) {
	db := r.storage.GetInstance(ctx)

	if vault.FolderID != nil {
		if db.Where("user_id = ? AND id = ?", userID, *vault.FolderID).Take(&model.Folder{}).Error != nil {
			return common.FailedCreationId, common.NewBadRequestError(errors.New("folder not found"), common.CodeBadRequestError)
		}
	}

	inserted := &model.Vault{
		UserID:       userID,
		FolderID:     vault.FolderID,
		Name:         vault.Name,
		Type:         vault.Type,
		Properties:   vault.Properties,
		CustomFields: vault.CustomFields,
		Note:         vault.Note,
		Deleted:      false,
	}

	if err := db.Create(inserted).Error; err != nil {
		return common.FailedCreationId, common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return inserted.ID, nil
}

func (r *vaultRepository) FindAllVaults(ctx context.Context, userID int) ([]model.Vault, error) {
	db := r.storage.GetInstance(ctx)

	var vaults []model.Vault
	if err := db.Where("user_id = ?", userID).Find(&vaults).Error; err != nil {
		return nil, common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return vaults, nil
}

func (r *vaultRepository) DeleteVault(ctx context.Context, userID, vaultID int) error {
	db := r.storage.GetInstance(ctx)

	if err := db.Model(&model.Vault{ID: vaultID}).Where("user_id = ?", userID).Update("deleted", true).Error; err != nil {
		return common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return nil
}

func (r *vaultRepository) UpdateVault(ctx context.Context, userID int, vault *dto.UpdateVaultInput) error {
	db := r.storage.GetInstance(ctx)

	currentVault := model.Vault{ID: vault.ID}

	if err := db.Where("user_id = ?", userID).Take(&currentVault).Error; err != nil {
		return common.NewBadRequestError(errors.New("vault not found"), common.CodeBadRequestError)
	}

	if vault.FolderID != nil && *vault.FolderID != *currentVault.FolderID {
		if db.Where("user_id = ? AND id = ?", userID, *vault.FolderID).Take(&model.Folder{}).Error != nil {
			return common.NewBadRequestError(errors.New("folder not found"), common.CodeBadRequestError)
		}
	}

	oldPwd, newPwd := currentVault.Properties["password"], vault.Properties["password"]

	if vault.Type == entity.VaultTypeLogin && newPwd != oldPwd {
		histories := currentVault.UpdateHistories

		histories = append(histories, entity.VaultUpdateHistory{CreatedAt: time.Now(),
			Value: common.Json{"Password": oldPwd},
		})

		currentVault.UpdateHistories = histories
	}

	currentVault.FolderID = vault.FolderID
	currentVault.Name = vault.Name
	currentVault.Type = vault.Type
	currentVault.Properties = vault.Properties
	currentVault.CustomFields = vault.CustomFields
	currentVault.Note = vault.Note

	if err := db.Save(&currentVault).Error; err != nil {
		return common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return nil
}

func NewVaultRepository(storage *infra.PgsqlStorage) *vaultRepository {
	return &vaultRepository{storage: storage}
}
