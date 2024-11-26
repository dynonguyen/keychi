package dto

import (
	"github.com/dynonguyen/keychi/api/internal/vault/entity"
)

type NewVaultInput struct {
	FolderID     *int                     `json:"folderId"`
	Name         string                   `json:"name" validate:"required"`
	Type         entity.VaultType         `json:"type" validate:"required"`
	CustomFields entity.VaultCustomFields `json:"customFields"`
	Properties   entity.VaultProperties   `json:"properties" validate:"required"`
	Note         *string                  `json:"note"`
}

type UpdateVaultInput struct {
	ID              int                         `json:"id" validate:"required"`
	FolderID        *int                        `json:"folderId"`
	Name            string                      `json:"name" validate:"required"`
	Type            entity.VaultType            `json:"type" validate:"required"`
	CustomFields    entity.VaultCustomFields    `json:"customFields"`
	Properties      entity.VaultProperties      `json:"properties" validate:"required"`
	Note            *string                     `json:"note"`
	UpdateHistories entity.VaultUpdateHistories `json:"updateHistories"`
}
