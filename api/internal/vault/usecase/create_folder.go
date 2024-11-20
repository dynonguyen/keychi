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

func (uc *createFolderUsecase) CreateFolder(ctx context.Context, userID int, folder *dto.NewFolderInput) error {
	validate := util.GetValidator()

	if err := validate.Struct(folder); err != nil {
		return common.NewBadRequestError(err, common.CodeBadRequestError)
	}

	_, err := uc.repo.InsertFolder(ctx, userID, folder)

	return err
}

func NewCreateFolderUsecase(repo repository.FolderRepository) *createFolderUsecase {
	return &createFolderUsecase{repo: repo}
}
