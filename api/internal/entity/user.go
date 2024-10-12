package entity

import "errors"

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

var (
	ErrNameIsRequired  = errors.New("name is required")
	ErrEmailIsRequired = errors.New("email is required")
)

func (u User) Validate() error {
	if u.Name == "" {
		return ErrNameIsRequired
	}

	if u.Email == "" {
		return ErrEmailIsRequired
	}

	return nil
}
