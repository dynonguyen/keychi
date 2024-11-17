package repository

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/vault/dto"
	"github.com/dynonguyen/keychi/api/internal/vault/model"
)

type FolderRepository interface {
	InsertFolder(ctx context.Context, folder *dto.NewFolderInput) (int, error)
	DeleteFolder(ctx context.Context, folder *dto.DeleteFolderInput) error
	FindAllFolders(ctx context.Context, userID int) ([]model.Folder, error)
}
