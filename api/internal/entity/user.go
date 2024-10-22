package entity

type User struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	PwdHint string `json:"pwdHint"`
}
