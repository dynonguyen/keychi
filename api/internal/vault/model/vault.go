package model

import (
	"time"

	"github.com/dynonguyen/keychi/api/internal/vault/entity"
)

type Vault struct {
	ID              int                         `json:"id" gorm:"column:id;primaryKey;->"`
	UserID          int                         `json:"userId" gorm:"column:user_id"`
	FolderID        *int                        `json:"folderId" gorm:"column:folder_id"`
	Name            string                      `json:"name"`
	Type            entity.VaultType            `json:"type"`
	CustomFields    []entity.VaultCustomField   `json:"customFields" gorm:"column:custom_fields"`
	Properties      []any                       `json:"properties"`
	Note            *string                     `json:"note"`
	Deleted         bool                        `json:"deleted"`
	UpdateHistories []entity.VaultUpdateHistory `json:"updateHistories" gorm:"column:update_histories"`
	CreatedAt       *time.Time                  `json:"createdAt"`
	UpdatedAt       *time.Time                  `json:"updatedAt"`
}

func (Vault) TableName() string {
	return "vaults"
}
