package dto

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
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	ExpireIn     int    `json:"expires_in"`
	TokenType    string `json:"token_type"`
}
