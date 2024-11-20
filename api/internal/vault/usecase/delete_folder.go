package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/vault/repository"
)

type deleteFolderUsecase struct {
	repo repository.FolderRepository
}

func (uc *deleteFolderUsecase) DeleteFolder(ctx context.Context, userID int, folderID int) error {
	return uc.repo.DeleteFolder(ctx, userID, folderID)
}

func NewDeleteFolderUsecase(repo repository.FolderRepository) *deleteFolderUsecase {
	return &deleteFolderUsecase{repo: repo}
}
