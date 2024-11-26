package dto

import (
	"errors"

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

func (u *UserPreferencesInput) ParseProperties() (map[string]interface{}, error) {
	var properties = make(map[string]interface{})
	switch u.Type {
	case UIPreferences:
		{
			if v, ok := u.Properties["theme"]; ok {
				if v == nil {
					properties["theme"] = nil
				} else if theme, ok := v.(string); ok {
					properties["theme"] = entity.UserThemeMode(theme)
				} else {
					return nil, errors.New("invalid type for theme")
				}
			}
			if v, ok := u.Properties["language"]; ok {
				if v == nil {
					properties["language"] = nil
				} else if language, ok := v.(string); ok {
					properties["language"] = entity.UserLanguage(language)
				} else {
					return nil, errors.New("invalid type for language")
				}
			}
		}
	case CipherPreferences:
		{
			if v, ok := u.Properties["vaultTimeout"]; ok {
				properties["vault_timeout"] = v
			}
			if v, ok := u.Properties["vaultTimeoutAction"]; ok {
				if v == nil {
					properties["vault_timeout_action"] = nil
				} else if action, ok := v.(string); ok {
					properties["vault_timeout_action"] = entity.VaultAction(action)
				} else {
					return nil, errors.New("invalid type for vaultTimeoutAction")
				}
			}
			if v, ok := u.Properties["kdfAlgorithm"]; ok {
				if v == nil {
					properties["kdf_algorithm"] = nil
				} else if algorithm, ok := v.(string); ok {
					properties["kdf_algorithm"] = entity.KdfAlgorithm(algorithm)
				} else {
					return nil, errors.New("invalid type for kdfAlgorithm")
				}
			}
			if v, ok := u.Properties["kdfIterations"]; ok {
				properties["kdf_iterations"] = v
			}
			if v, ok := u.Properties["kdfMemory"]; ok {
				properties["kdf_memory"] = v
			}
			if v, ok := u.Properties["kdfParallelism"]; ok {
				properties["kdf_parallelism"] = v
			}
		}
	default:
		return nil, errors.New("invalid user preferences type")
	}
	return properties, nil
}
