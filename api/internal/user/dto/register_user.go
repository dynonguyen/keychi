package dto

type UserRegistrationInput struct {
	Name     string `json:"name" validate:"required" gorm:"column:name"`
	Email    string `json:"email" validate:"required,email" gorm:"column:email"`
	Password string `json:"password" validate:"required"`
	PwdHint  string `json:"pwdHint" gorm:"column:pwd_hint"`
}
