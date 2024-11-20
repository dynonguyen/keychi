package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/vault/model"
	"github.com/dynonguyen/keychi/api/internal/vault/repository"
)

type listFolderUsecase struct {
	repo repository.FolderRepository
}

func (uc *listFolderUsecase) ListFolder(ctx context.Context, userID int) ([]model.Folder, error) {
	folders, err := uc.repo.FindAllFolders(ctx, userID)

	if err != nil {
		return nil, common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return folders, nil
}

func NewListFolderUsecase(repo repository.FolderRepository) *listFolderUsecase {
	return &listFolderUsecase{repo: repo}
}
