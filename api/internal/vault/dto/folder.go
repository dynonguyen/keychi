package dto

type NewFolderInput struct {
	Name  string  `json:"name" validate:"required"`
	Icon  *string `json:"icon"`
	Color *string `json:"color"`
}

type UpdateFolderInput struct {
	FolderID int     `json:"folderId" validate:"required"`
	Name     string  `json:"name"`
	Icon     *string `json:"icon"`
	Color    *string `json:"color"`
}
