package usecase

import (
	"context"
	"fmt"
	"slices"
	"testing"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/mock"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/stretchr/testify/assert"
)

var testCases = []struct {
	user dto.UserRegistrationInput
	code common.I18nCode
}{
	{user: dto.UserRegistrationInput{Email: "user1@email.com", Name: "user1", Password: "123"}, code: ""},
	{user: dto.UserRegistrationInput{Email: ""}, code: common.CodeBadRequestError},
	{user: dto.UserRegistrationInput{Email: "user1"}, code: common.CodeBadRequestError},
	{user: dto.UserRegistrationInput{Email: "user2@email.com", Name: "", Password: "123"}, code: common.CodeBadRequestError},
	{user: dto.UserRegistrationInput{Email: "user1@email.com", Name: "existed", Password: "456"}, code: common.CodeBadRequestError},
}

var mockStorage = []*dto.UserRegistrationInput{}

type mockTransactionManager struct{}
type mockRepository struct{}

func (m *mockTransactionManager) WithTransaction(fn func() error) error {
	return fn()
}

func (m *mockRepository) InsertUser(ctx context.Context, user *dto.UserRegistrationInput) error {
	if slices.ContainsFunc(mockStorage, func(item *dto.UserRegistrationInput) bool { return item.Email == user.Email }) {
		return common.NewBadRequestError(fmt.Errorf("user already exists"), common.CodeBadRequestError)
	}

	mockStorage = append(mockStorage, user)

	return nil
}

func TestRegisterUser(t *testing.T) {
	assert := assert.New(t)

	mockRepo := &mockRepository{}
	mockAuth := mock.NewMockAuthService()
	mockTxm := &mockTransactionManager{}

	for index, tc := range testCases {
		uc := NewRegisterUserUsecase(mockTxm, mockRepo, mockAuth)
		err := uc.RegisterUser(context.Background(), &tc.user)

		tcMsg := fmt.Sprintf("Case %d", index+1)

		if err != nil {
			assert.Equal(tc.code, err.(*common.AppError).Code, tcMsg)
		} else {
			assert.Equal(string(tc.code), "", tcMsg)
		}
	}
}
