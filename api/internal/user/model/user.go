package model

import "time"

type UserModel struct {
	ID        int        `json:"id" gorm:"column:id;primaryKey;->"`
	Name      string     `json:"name"`
	Email     string     `json:"email"`
	PwdHint   string     `json:"pwdHint"`
	Avatar    string     `json:"avatar"`
	CreatedAt *time.Time `json:"createdAt"`
	UpdatedAt *time.Time `json:"updatedAt"`
}

func (u *UserModel) TableName() string {
	return "users"
}
