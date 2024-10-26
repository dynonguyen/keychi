package entity

type User struct {
	ID      uint   `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	PwdHint string `json:"pwdHint"`
	Avatar  string `json:"avatar"`
}
