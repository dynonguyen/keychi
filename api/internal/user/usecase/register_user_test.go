package usecase

import (
	"context"
	"errors"
	"testing"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/stretchr/testify/mock"
)

var testCases = []struct {
	user *dto.UserRegistrationInput
	err  error
}{
	{
		user: &dto.UserRegistrationInput{
			Name:     "Test",
			Email:    "test@email.com",
			Password: "password",
		},
		err: nil,
	},
	{
		user: &dto.UserRegistrationInput{
			Name: "",
		},
		err: common.NewBadRequestError(errors.New(""), common.CodeBadRequestError),
	},
}

type mockObject struct {
	mock.Mock
}

func (m *mockObject) InsertUser(ctx context.Context, user *dto.UserRegistrationInput) error {
	args := m.Called(ctx, user)
	return args.Error(0)
}

func (m *mockObject) CreateUser(ctx context.Context, user *dto.UserRegistrationInput) error {
	args := m.Called(ctx, user)
	return args.Error(0)
}

func TestRegisterUserUC(t *testing.T) {
	ctx := context.Background()

	for _, tc := range testCases {
		mockRepo := new(mockObject)

		mockRepo.On("InsertUser", ctx, tc.user).Return(tc.err)
		mockRepo.On("CreateUser", ctx, tc.user).Return(tc.err)

		NewRegisterUserUsecase(mockRepo, mockRepo).RegisterUser(ctx, tc.user)

		mockRepo.AssertExpectations(t)

	}
}
