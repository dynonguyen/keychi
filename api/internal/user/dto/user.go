package dto

import (
	"github.com/dynonguyen/keychi/api/internal/user/model"
)

type UserRegistrationInput struct {
	Name     string `json:"name" validate:"required" gorm:"column:name"`
	Email    string `json:"email" validate:"required,email" gorm:"column:email"`
	Password string `json:"password" validate:"required"`
	PwdHint  string `json:"pwdHint" gorm:"column:pwd_hint"`
}

type UserLoginInput struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type UserToken struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
	ExpireIn     int    `json:"expiresIn"`
	TokenType    string `json:"tokenType"`
}

type UserProfile struct {
	model.UserModel
	Preferences model.UserPreferencesModel `json:"preferences"`
}

type UserLogout struct {
	RefreshToken string `json:"refreshToken" validate:"required"`
}
