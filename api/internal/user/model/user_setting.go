package model

import (
	"time"

	"github.com/dynonguyen/keychi/api/internal/user/entity"
)

type UserSettingModel struct {
	ID                 int                  `json:"id" gorm:"column:id;primaryKey;->"`
	UserID             int                  `json:"userId"`
	Theme              entity.UserThemeMode `json:"theme"`
	VaultTimeout       int                  `json:"vaultTimeout"`
	VaultTimeoutAction entity.VaultAction   `json:"vaultTimeoutAction"`
	Language           entity.UserLanguage  `json:"language"`
	KdfSalt            string               `json:"kdfSalt"`
	KdfAlgorithm       entity.KdfAlgorithm  `json:"kdfAlgorithm"`
	KdfIterations      int                  `json:"kdfIterations"`
	KdfMemory          *int                 `json:"kdfMemory"`
	KdfParallelism     *int                 `json:"kdfParallelism"`
	CreatedAt          *time.Time           `json:"createdAt"`
	UpdatedAt          *time.Time           `json:"updatedAt"`
}

func (u *UserSettingModel) TableName() string {
	return "settings"
}
