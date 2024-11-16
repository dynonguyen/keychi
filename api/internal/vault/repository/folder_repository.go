package repository

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/vault/dto"
)

type FolderRepository interface {
	InsertFolder(ctx context.Context, folder *dto.NewFolderInput) (int, error)
}
