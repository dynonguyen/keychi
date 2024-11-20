package dto

import "github.com/dynonguyen/keychi/api/internal/user/entity"

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

type PreLoginInput struct {
	Email string `json:"email" validate:"required,email"`
}

type UserToken struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
	ExpireIn     int    `json:"expiresIn"`
	TokenType    string `json:"tokenType"`
}

type UserInfo struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Email  string `json:"email"`
	Avatar string `json:"avatar"`
}

type UserLogout struct {
	RefreshToken string `json:"refreshToken" validate:"required"`
}

type PreLoginResponse struct {
	KdfAlgorithm   entity.KdfAlgorithm `json:"kdfAlgorithm"`
	KdfIterations  int                 `json:"kdfIterations"`
	KdfMemory      *int                `json:"kdfMemory"`
	KdfParallelism *int                `json:"kdfParallelism"`
}
