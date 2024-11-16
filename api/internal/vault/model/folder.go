package model

type Folder struct {
	ID     int     `json:"id" gorm:"primaryKey"`
	UserID int     `json:"userId"`
	Name   string  `json:"name"`
	Icon   *string `json:"icon"`
	Color  *string `json:"color"`
}
