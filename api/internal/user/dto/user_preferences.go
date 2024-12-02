package dto

import (
	"bytes"
	"encoding/json"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/user/entity"
	"github.com/dynonguyen/keychi/api/internal/util"
)

type UserPreferencesType string

const (
	UIPreferences     UserPreferencesType = "ui"
	CipherPreferences UserPreferencesType = "cipher"
)

type UserPreferencesProperties common.Json

type UIPreferencesProperties struct {
	Theme    *entity.UserThemeMode `json:"theme,omitempty" validate:"omitempty,enumUserThemeMode"`
	Language *entity.UserLanguage  `json:"language,omitempty" validate:"omitempty,enumUserLanguage"`
}

func (u *UIPreferencesProperties) Validate() error {
	v := util.GetValidator()
	util.RegisterEnumValidator(v, "enumUserThemeMode", new(entity.UserThemeMode).Values())
	util.RegisterEnumValidator(v, "enumUserLanguage", new(entity.UserLanguage).Values())
	return v.Struct(u)
}

type CipherPreferencesProperties struct {
	VaultTimeout       *int                 `json:"vaultTimeout,omitempty"`
	VaultTimeoutAction *entity.VaultAction  `json:"vaultTimeoutAction,omitempty" validate:"omitempty,enumVaultAction"`
	KdfAlgorithm       *entity.KdfAlgorithm `json:"kdfAlgorithm,omitempty" validate:"omitempty,enumKdfAlgorithm"`
	KdfIterations      *int                 `json:"kdfIterations,omitempty"`
	KdfMemory          *int                 `json:"kdfMemory,omitempty"`
	KdfParallelism     *int                 `json:"kdfParallelism,omitempty"`
}

func (c *CipherPreferencesProperties) Validate() error {
	v := util.GetValidator()
	util.RegisterEnumValidator(v, "enumVaultAction", new(entity.VaultAction).Values())
	util.RegisterEnumValidator(v, "enumKdfAlgorithm", new(entity.KdfAlgorithm).Values())
	return v.Struct(c)
}

type UserPreferencesInput struct {
	Type       UserPreferencesType       `json:"type" validate:"required"`
	Properties UserPreferencesProperties `json:"properties" validate:"required"`
}

func (u *UserPreferencesInput) ToMap() (map[string]any, error) {
	propertiesBytes, err := json.Marshal(u.Properties)
	if err != nil {
		return nil, err
	}

	var properties interface {
		Validate() error
	}
	switch u.Type {
	case UIPreferences:
		properties = &UIPreferencesProperties{}
	case CipherPreferences:
		properties = &CipherPreferencesProperties{}
	default:
		return map[string]any{}, nil
	}

	decoder := json.NewDecoder(bytes.NewReader(propertiesBytes))
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(properties); err != nil {
		return nil, err
	}

	if err := properties.Validate(); err != nil {
		return nil, err
	}

	return util.CamelKeysToSnake(u.Properties), nil
}
