package postgres

import (
	"context"
	"errors"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/entity"
	"github.com/dynonguyen/keychi/api/internal/user/model"
	"github.com/dynonguyen/keychi/api/internal/user/repository"
	"gorm.io/gorm"
)

type registerUserRepo struct {
	storage *infra.PgsqlStorage
}

var (
	codeEmailDuplicate common.I18nCode = "EMAIL_DUPLICATE"
)

func (r *registerUserRepo) InsertUser(ctx context.Context, user *dto.UserRegistrationInput) (error, int) {
	db := r.storage.GetInstance()
	failedUserId := -1

	// Check if user existed
	if result := db.Where("email = ?", user.Email).Take(&model.UserModel{}); result.Error != gorm.ErrRecordNotFound {
		return common.NewBadRequestError(errors.New("email already existed"), codeEmailDuplicate), failedUserId
	}

	inserted := &model.UserModel{
		Name:    user.Name,
		Email:   user.Email,
		PwdHint: user.PwdHint,
	}

	if err := db.Create(inserted).Error; err != nil {
		return common.NewBadRequestError(err, common.CodeInternalServerError), failedUserId
	}

	return nil, inserted.ID
}

func (r *registerUserRepo) CreateDefaultUserSettings(ctx context.Context, userId int) error {
	db := r.storage.GetInstance()

	if err := db.Create(&model.UserSettingModel{
		UserID:             userId,
		Theme:              entity.DefaultUserSetting.Theme,
		VaultTimeout:       entity.DefaultUserSetting.VaultTimeout,
		VaultTimeoutAction: entity.DefaultUserSetting.VaultTimeoutAction,
		Language:           entity.DefaultUserSetting.Language,
		KdfAlgorithm:       entity.DefaultUserSetting.KdfAlgorithm,
		KdfIterations:      entity.DefaultUserSetting.KdfIterations,
	}).Error; err != nil {
		return common.NewBadRequestError(err, common.CodeInternalServerError)
	}

	return nil
}

func NewRegisterUserRepo(s *infra.PgsqlStorage) repository.RegisterUserRepository {
	return &registerUserRepo{storage: s}
}
