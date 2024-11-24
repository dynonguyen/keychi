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
	CustomFields    entity.VaultCustomFields    `json:"customFields" gorm:"column:custom_fields;type:jsonb"`
	Properties      entity.VaultProperties      `json:"properties" gorm:"column:properties;type:jsonb"`
	Note            *string                     `json:"note"`
	Deleted         bool                        `json:"deleted"`
	UpdateHistories []entity.VaultUpdateHistory `json:"updateHistories" gorm:"column:update_histories;type:jsonb"`
	CreatedAt       *time.Time                  `json:"createdAt"`
	UpdatedAt       *time.Time                  `json:"updatedAt"`
}

func (Vault) TableName() string {
	return "vaults"
}
