package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/vault/dto"
	"github.com/dynonguyen/keychi/api/internal/vault/repository"
)

type deleteFolderUsecase struct {
	repo repository.FolderRepository
}

func (uc *deleteFolderUsecase) DeleteFolder(ctx context.Context, folder *dto.DeleteFolderInput) error {
	return uc.repo.DeleteFolder(ctx, folder)
}

func NewDeleteFolderUsecase(repo repository.FolderRepository) *deleteFolderUsecase {
	return &deleteFolderUsecase{repo: repo}
}
