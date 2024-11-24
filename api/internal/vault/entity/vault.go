package entity

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/util"
	"github.com/samber/lo"
)

type VaultType string

const (
	VaultTypeLogin VaultType = "login"
	VaultTypeCard  VaultType = "card"
)

// -----------------------------
type VaultCustomField struct {
	Type  string `json:"type"`
	Name  string `json:"name"`
	Value string `json:"value"`
}

type VaultCustomFields []VaultCustomField

func (p VaultCustomFields) Value() (driver.Value, error) {
	if len(p) == 0 {
		return nil, nil
	}

	return json.Marshal(p)
}

func (p *VaultCustomFields) Scan(value any) error {
	bytes, ok := value.([]byte)

	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal JSON value:", value))
	}

	result := VaultCustomFields{}
	err := json.Unmarshal(bytes, &result)
	*p = VaultCustomFields(result)

	return err
}

// -----------------------------
type VaultUpdateHistory struct {
	CreatedAt time.Time   `json:"createdAt"`
	Value     common.Json `json:"value"`
}

// -----------------------------
type VaultLoginProperty struct {
	Username string   `json:"username" validate:"required"`
	Password string   `json:"password" validate:"required"`
	Urls     []string `json:"urls"`
}

type VaultCardProperty struct {
	CardholderName string `json:"cardholderName"`
	CardNumber     string `json:"cardNumber"`
	Brand          string `json:"brand"`
	Cvv            string `json:"cvv"`
	ExpireMonth    int    `json:"expireMonth"`
	ExpireYear     int    `json:"expireYear"`
}

type VaultProperties common.Json

func (p VaultProperties) Value() (driver.Value, error) {
	return json.Marshal(p)
}

func (p *VaultProperties) Scan(value any) error {
	bytes, ok := value.([]byte)

	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal JSON value:", value))
	}

	result := VaultProperties{}
	err := json.Unmarshal(bytes, &result)
	*p = VaultProperties(result)

	return err
}

// -----------------------------

type Vault struct {
	ID              int                  `json:"id"`
	UserID          int                  `json:"userId"`
	FolderID        *int                 `json:"folderId"`
	Name            string               `json:"name"`
	Type            VaultType            `json:"type"`
	CustomFields    VaultCustomFields    `json:"customFields"`
	Properties      VaultProperties      `json:"properties"`
	Note            *string              `json:"note"`
	Deleted         bool                 `json:"deleted"`
	UpdateHistories []VaultUpdateHistory `json:"updateHistories"`
	CreatedAt       *time.Time           `json:"createdAt"`
	UpdatedAt       *time.Time           `json:"updatedAt"`
}

func (v *Vault) ValidateProperties() error {
	vType, properties := v.Type, v.Properties
	validate := util.GetValidator()

	switch vType {
	case VaultTypeLogin:
		lProps := VaultLoginProperty{
			Username: properties["username"].(string),
			Password: properties["password"].(string),
			Urls: lo.Map(properties["urls"].([]any), func(item any, _ int) string {
				return string(item.(string))
			}),
		}

		if err := validate.Struct(lProps); err != nil {
			return err
		}

	case VaultTypeCard:
		cProps := VaultCardProperty{
			CardholderName: properties["cardholderName"].(string),
			CardNumber:     properties["cardNumber"].(string),
			Brand:          properties["brand"].(string),
			Cvv:            properties["cvv"].(string),
			ExpireMonth:    int(properties["expireMonth"].(float64)),
			ExpireYear:     int(properties["expireYear"].(float64)),
		}

		if err := validate.Struct(cProps); err != nil {
			return err
		}

	default:
		return errors.New("invalid vault type")
	}

	return nil
}
