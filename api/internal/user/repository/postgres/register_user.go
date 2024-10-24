package postgres

import (
	"context"
	"errors"

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

var (
	ErrDuplicatedEmail = errors.New("Email already existed")
)

type registerUserRepo struct {
	storage *infra.PgsqlStorage
}

func (r *registerUserRepo) InsertUser(ctx context.Context, user *dto.UserRegistrationInput) error {
	db := r.storage.DB

	// Check if user existed
	if result := db.Where("email = ?", user.Email).Take(&model.UserModel{}); result.Error != gorm.ErrRecordNotFound {
		return common.NewBadRequestError(ErrDuplicatedEmail, CodeDuplicateEmail)
	}

	err := db.Create(&model.UserModel{
		Name:    user.Name,
		Email:   user.Email,
		PwdHint: user.PwdHint,
	}).Error

	return common.NewBadRequestError(err, common.CodeInternalServerError)
}

func NewRegisterUserRepo(s *infra.PgsqlStorage) repository.RegisterUserRepository {
	return &registerUserRepo{storage: s}
}
