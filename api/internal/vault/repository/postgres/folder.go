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

func (r *folderRepository) InsertFolder(ctx context.Context, userID int, folder *dto.NewFolderInput) (int, error) {
	db := r.storage.GetInstance()

	if result := db.Where("name = ? AND user_id = ?", folder.Name, userID).Take(&model.Folder{}); result.Error != gorm.ErrRecordNotFound {
		return common.FailedCreationId, common.NewBadRequestError(errors.New("folder already existed"), codeEmailDuplicate)
	}

	inserted := &model.Folder{
		UserID: userID,
		Name:   folder.Name,
		Icon:   folder.Icon,
		Color:  folder.Color,
	}

	if err := db.Create(inserted).Error; err != nil {
		return common.FailedCreationId, common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return inserted.ID, nil
}

func (r *folderRepository) DeleteFolder(ctx context.Context, userID int, folderID int) error {
	db := r.storage.GetInstance()

	if err := db.Where("user_id = ?", userID).Delete(&model.Folder{}, folderID).Error; err != nil {
		return common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return nil
}

func (r *folderRepository) FindAllFolders(ctx context.Context, userID int) ([]model.Folder, error) {
	db := r.storage.GetInstance()

	var folders []model.Folder
	if err := db.Where("user_id = ?", userID).Find(&folders).Error; err != nil {
		return nil, common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return folders, nil
}

func (r *folderRepository) UpdateFolder(ctx context.Context, userID int, folder *dto.UpdateFolderInput) error {
	db := r.storage.GetInstance()

	updated := &model.Folder{Name: folder.Name, Icon: folder.Icon, Color: folder.Color}

	if err := db.Model(&model.Folder{ID: folder.FolderID}).Omit("UserID", "ID", "CreatedAt").Where("user_id = ?", userID).Updates(updated).Error; err != nil {
		return common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return nil
}

func NewFolderRepository(s *infra.PgsqlStorage) *folderRepository {
	return &folderRepository{storage: s}
}
