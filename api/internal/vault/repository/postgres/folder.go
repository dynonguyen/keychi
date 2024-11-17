package postgres

import (
	"context"
	"errors"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/vault/dto"
	"github.com/dynonguyen/keychi/api/internal/vault/model"
	"gorm.io/gorm"
)

type folderRepository struct {
	storage *infra.PgsqlStorage
}

var (
	codeEmailDuplicate common.I18nCode = "FOLDER_DUPLICATE"
)

func (r *folderRepository) InsertFolder(ctx context.Context, folder *dto.NewFolderInput) (int, error) {
	db := r.storage.GetInstance()

	if result := db.Where("name = ? AND user_id = ?", folder.Name, folder.UserID).Take(&model.Folder{}); result.Error != gorm.ErrRecordNotFound {
		return common.FailedCreationId, common.NewBadRequestError(errors.New("folder already existed"), codeEmailDuplicate)
	}

	inserted := &model.Folder{
		UserID: folder.UserID,
		Name:   folder.Name,
		Icon:   folder.Icon,
		Color:  folder.Color,
	}

	if err := db.Create(inserted).Error; err != nil {
		return common.FailedCreationId, common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return inserted.ID, nil
}

func (r *folderRepository) DeleteFolder(ctx context.Context, folder *dto.DeleteFolderInput) error {
	db := r.storage.GetInstance()

	if err := db.Where("user_id = ?", folder.UserID).Delete(&model.Folder{}, folder.FolderID).Error; err != nil {
		return common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return nil
}

func NewFolderRepository(s *infra.PgsqlStorage) *folderRepository {
	return &folderRepository{storage: s}
}
