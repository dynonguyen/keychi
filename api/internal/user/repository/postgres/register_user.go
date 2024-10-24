package postgres

import (
	"context"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/model"
	"github.com/dynonguyen/keychi/api/internal/user/repository"
	"gorm.io/gorm"
)

const (
	CodeDuplicateEmail common.I18nCode = "EMAIL_DUPLICATE"
)

type registerUserRepo struct {
	storage *infra.PgsqlStorage
}

func (r *registerUserRepo) InsertUser(ctx context.Context, user *dto.UserRegistrationInput) (common.I18nCode, error) {
	db := r.storage.DB

	// Check if user existed
	if result := db.Where("email = ?", user.Email).Take(&model.UserModel{}); result.Error != gorm.ErrRecordNotFound {
		return CodeDuplicateEmail, nil
	}

	err := db.Create(&model.UserModel{
		Name:    user.Name,
		Email:   user.Email,
		PwdHint: user.PwdHint,
	}).Error

	return "", err
}

func NewRegisterUserRepo(s *infra.PgsqlStorage) repository.RegisterUserRepository {
	return &registerUserRepo{storage: s}
}
