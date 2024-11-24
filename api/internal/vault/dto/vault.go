package dto

import (
	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/vault/entity"
)

type NewVaultInput struct {
	FolderID     *int                      `json:"folderId"`
	Name         string                    `json:"name" validate:"required"`
	Type         entity.VaultType          `json:"type" validate:"required"`
	CustomFields []entity.VaultCustomField `json:"customFields"`
	Properties   common.Json               `json:"properties" validate:"required"`
	Note         *string                   `json:"note"`
}
