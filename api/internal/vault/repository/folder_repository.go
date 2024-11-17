package repository

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/vault/dto"
	"github.com/dynonguyen/keychi/api/internal/vault/model"
)

type FolderRepository interface {
	InsertFolder(ctx context.Context, userID int, folder *dto.NewFolderInput) (int, error)
	DeleteFolder(ctx context.Context, userID int, folderID int) error
	FindAllFolders(ctx context.Context, userID int) ([]model.Folder, error)
	UpdateFolder(ctx context.Context, userID int, folder *dto.UpdateFolderInput) error
}
