package entity

import "time"

type UserThemeMode string
type UserLanguage string
type KdfAlgorithm string
type VaultAction string

const (
	Light  UserThemeMode = "light"
	Dark   UserThemeMode = "dark"
	System UserThemeMode = "system"
)

const (
	English    UserLanguage = "en"
	Vietnamese UserLanguage = "vi"
)

const (
	PBKDF2 KdfAlgorithm = "pbkdf2"
	Argon2 KdfAlgorithm = "argon2"
)

const (
	Lock   VaultAction = "lock"
	Logout VaultAction = "logout"
)

func (m UserThemeMode) Values() []string {
	return []string{string(Light), string(Dark), string(System)}
}

func (l UserLanguage) Values() []string {
	return []string{string(English), string(Vietnamese)}
}

func (k KdfAlgorithm) Values() []string {
	return []string{string(PBKDF2), string(Argon2)}
}

func (v VaultAction) Values() []string {
	return []string{string(Lock), string(Logout)}
}

type UserPreferences struct {
	ID                 int           `json:"id"`
	UserID             int           `json:"userId"`
	Theme              UserThemeMode `json:"theme"`
	VaultTimeout       int           `json:"vaultTimeout"`
	VaultTimeoutAction VaultAction   `json:"vaultTimeoutAction"`
	Language           UserLanguage  `json:"language"`
	KdfSalt            string        `json:"kdfSalt"`
	KdfAlgorithm       KdfAlgorithm  `json:"kdfAlgorithm"`
	KdfIterations      int           `json:"kdfIterations"`
	KdfMemory          *int          `json:"kdfMemory"`
	KdfParallelism     *int          `json:"kdfParallelism"`
	CreatedAt          *time.Time    `json:"createdAt"`
	UpdatedAt          *time.Time    `json:"updatedAt"`
}

var DefaultUserPreferences = &UserPreferences{
	Theme:              System,
	VaultTimeout:       0,
	VaultTimeoutAction: Lock,
	Language:           English,
	KdfAlgorithm:       PBKDF2,
	KdfIterations:      600000,
}
