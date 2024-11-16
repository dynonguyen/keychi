package entity

import "time"

type Folder struct {
	ID        int        `json:"id" gorm:"column:id;primaryKey;->"`
	UserID    int        `json:"userId"`
	Name      string     `json:"name"`
	Icon      string     `json:"icon"`
	Color     string     `json:"color"`
	CreatedAt *time.Time `json:"createdAt"`
	UpdatedAt *time.Time `json:"updatedAt"`
}

func (Folder) TableName() string {
	return "folders"
}
