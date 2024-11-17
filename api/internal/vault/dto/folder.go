package dto

type NewFolderInput struct {
	UserID int     `json:"userId" validate:"required"`
	Name   string  `json:"name" validate:"required"`
	Icon   *string `json:"icon"`
	Color  *string `json:"color"`
}

type DeleteFolderInput struct {
	UserID   int `json:"userId" validate:"required"`
	FolderID int `json:"folderId" validate:"required"`
}
