package dto

import (
	"errors"
	"reflect"
	"strings"

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

func GetJSONTagName(field reflect.StructField) string {
	tag := field.Tag.Get("json")

	if commaIndex := strings.Index(tag, ","); commaIndex != -1 {
		return tag[:commaIndex]
	}

	return tag
}

func (u *UserPreferencesInput) ParseProperties() (map[string]interface{}, error) {
	var properties = make(map[string]interface{})
	var pStruct any

	switch u.Type {
	case UIPreferences:
		pStruct = UIPreferencesProperties{}
	case CipherPreferences:
		pStruct = CipherPreferencesProperties{}
	default:
		return nil, errors.New("invalid preferences type")
	}

	t := reflect.TypeOf(pStruct)
	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)

		// jsonTagRaw := field.Tag.Get("json")
		jsonTag := GetJSONTagName(field)

		if value := u.Properties[jsonTag]; value != nil {
			properties[jsonTag] = value
		}
	}

	return properties, nil
}
