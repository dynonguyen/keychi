package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/util"
	"github.com/dynonguyen/keychi/api/internal/vault/dto"
	"github.com/dynonguyen/keychi/api/internal/vault/repository"
)

type updateFolderUsecase struct {
	repo repository.FolderRepository
}

func (uc *updateFolderUsecase) UpdateFolder(ctx context.Context, userID int, folder *dto.UpdateFolderInput) error {
	validate := util.GetValidator()

	if err := validate.Struct(folder); err != nil {
		return common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	return uc.repo.UpdateFolder(ctx, userID, folder)
}

func NewUpdateFolderUsecase(repo repository.FolderRepository) *updateFolderUsecase {
	return &updateFolderUsecase{repo: repo}
}
