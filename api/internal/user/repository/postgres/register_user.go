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
	"github.com/dynonguyen/keychi/api/internal/util"
	"gorm.io/gorm"
)

type registerUserRepo struct {
	storage *infra.PgsqlStorage
}

var (
	codeEmailDuplicate common.I18nCode = "EMAIL_DUPLICATE"
)

func (r *registerUserRepo) InsertUser(ctx context.Context, user *dto.UserRegistrationInput) (int, error) {
	db := r.storage.GetInstance()

	// Check if user existed
	if result := db.Where("email = ?", user.Email).Take(&model.UserModel{}); result.Error != gorm.ErrRecordNotFound {
		return common.FailedCreationId, common.NewBadRequestError(errors.New("email already existed"), codeEmailDuplicate)
	}

	inserted := &model.UserModel{
		Name:    user.Name,
		Email:   user.Email,
		PwdHint: user.PwdHint,
	}

	if err := db.Create(inserted).Error; err != nil {
		return common.FailedCreationId, common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return inserted.ID, nil
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
		KdfSalt:            util.GenerateUniqueString(16),
	}).Error; err != nil {
		return common.NewBadRequestError(err, common.CodeInternalServerError)
	}

	return nil
}

func NewRegisterUserRepo(s *infra.PgsqlStorage) repository.RegisterUserRepository {
	return &registerUserRepo{storage: s}
}
