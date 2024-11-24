package usecase

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/util"
	"github.com/dynonguyen/keychi/api/internal/vault/dto"
	"github.com/dynonguyen/keychi/api/internal/vault/repository"
)

type createFolderUsecase struct {
	repo repository.FolderRepository
}

func (uc *createFolderUsecase) CreateFolder(ctx context.Context, userID int, folder *dto.NewFolderInput) (int, error) {
	validate := util.GetValidator()

	if err := validate.Struct(folder); err != nil {
		return common.FailedCreationId, common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	return uc.repo.InsertFolder(ctx, userID, folder)
}

func NewCreateFolderUsecase(repo repository.FolderRepository) *createFolderUsecase {
	return &createFolderUsecase{repo: repo}
}
