package dto

import (
	"bytes"
	"encoding/json"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/user/entity"
)

type UserPreferencesType string

const (
	UIPreferences     UserPreferencesType = "ui"
	CipherPreferences UserPreferencesType = "cipher"
)

type UserPreferencesProperties common.Json

type UIPreferencesProperties struct {
	Theme    *entity.UserThemeMode `json:"theme,omitempty"`
	Language *entity.UserLanguage  `json:"language,omitempty"`
}

type CipherPreferencesProperties struct {
	VaultTimeout       *int                 `json:"vaultTimeout,omitempty"`
	VaultTimeoutAction *entity.VaultAction  `json:"vaultTimeoutAction,omitempty"`
	KdfAlgorithm       *entity.KdfAlgorithm `json:"kdfAlgorithm,omitempty"`
	KdfIterations      *int                 `json:"kdfIterations,omitempty"`
	KdfMemory          *int                 `json:"kdfMemory,omitempty"`
	KdfParallelism     *int                 `json:"kdfParallelism,omitempty"`
}

type UserPreferencesInput struct {
	Type       UserPreferencesType       `json:"type" validate:"required"`
	Properties UserPreferencesProperties `json:"properties" validate:"required"`
}

func JSONToStruct(input []byte, output interface{}) error {
	decoder := json.NewDecoder(bytes.NewReader(input))
	decoder.DisallowUnknownFields()
	return decoder.Decode(output)
}

func (u *UserPreferencesInput) ParseProperties() (interface{}, error) {
	var props interface{}
	switch u.Type {
	case UIPreferences:
		props = &UIPreferencesProperties{}
	case CipherPreferences:
		props = &CipherPreferencesProperties{}
	default:
		return nil, nil
	}

	propertiesBytes, err := json.Marshal(u.Properties)
	if err != nil {
		return nil, err
	}

	if err := JSONToStruct(propertiesBytes, props); err != nil {
		return nil, err
	}

	return props, nil
}
