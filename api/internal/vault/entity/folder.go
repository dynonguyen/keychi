package entity

import "time"

type Folder struct {
	ID        int        `json:"id"`
	UserID    int        `json:"userId"`
	Name      string     `json:"name"`
	Icon      string     `json:"icon"`
	Color     string     `json:"color"`
	CreatedAt *time.Time `json:"createdAt"`
	UpdatedAt *time.Time `json:"updatedAt"`
}
