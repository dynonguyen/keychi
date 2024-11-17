package entity

import "time"

type VaultType string

const (
	VaultTypeLogin VaultType = "login"
	VaultTypeCard  VaultType = "card"
)

type VaultCustomField struct {
	Type  string `json:"type"`
	Name  string `json:"name"`
	Value string `json:"value"`
}

type VaultLoginProperty struct {
	Username string   `json:"username"`
	Password string   `json:"password"`
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

type VaultUpdateHistory struct {
	CreatedAt time.Time `json:"createdAt"`
	Value     any       `json:"value"`
}

type Vault struct {
	ID              int                  `json:"id"`
	UserID          int                  `json:"userId"`
	FolderID        *int                 `json:"folderId"`
	Name            string               `json:"name"`
	Type            VaultType            `json:"type"`
	CustomFields    []VaultCustomField   `json:"customFields"`
	Properties      []any                `json:"properties"`
	Note            *string              `json:"note"`
	Deleted         bool                 `json:"deleted"`
	UpdateHistories []VaultUpdateHistory `json:"updateHistories"`
	CreatedAt       *time.Time           `json:"createdAt"`
	UpdatedAt       *time.Time           `json:"updatedAt"`
}
