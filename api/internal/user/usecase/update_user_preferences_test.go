package usecase

import (
	"context"
	"fmt"
	"testing"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/model"
	"github.com/stretchr/testify/assert"
)

type mockUFRepository struct{}

var userPreferencesTestCases = []struct {
	input dto.UserPreferencesInput
	code  common.I18nCode
}{
	{
		input: dto.UserPreferencesInput{
			Type: "ui",
			Properties: map[string]interface{}{
				"theme":       "dark",
				"parallelism": 1,
			},
		},
		code: "",
	},
	{
		input: dto.UserPreferencesInput{
			Type: "ui",
			Properties: map[string]interface{}{
				"theme": nil,
			},
		},
		code: "",
	},
	{
		input: dto.UserPreferencesInput{
			Type: "cipher",
			Properties: map[string]interface{}{
				"theme": "dark",
			},
		},
		code: "",
	},
	{
		input: dto.UserPreferencesInput{
			Type: "cipher",
			Properties: map[string]interface{}{
				"vaultTimeout": 1,
			},
		},
		code: "",
	},
}

func (m *mockUFRepository) UpdateUserPreferencesByUserId(ctx context.Context, id int, properties interface{}) error {
	return nil
}

func (m *mockUFRepository) FindUserById(ctx context.Context, id int) (*model.UserModel, error) {
	return nil, nil
}

func (m *mockUFRepository) FindUserPreferencesByUserId(ctx context.Context, userId int) (*model.UserPreferencesModel, error) {
	return nil, nil
}

func TestUpdateUserPreferences(t *testing.T) {
	assert := assert.New(t)

	mockRepo := &mockUFRepository{}

	for index, tc := range userPreferencesTestCases {
		uc := NewUpdateUserPreferencesUseCase(mockRepo)
		err := uc.UpdateUserPreferences(context.Background(), 1, &tc.input)

		tcMsg := fmt.Sprintf("Case %d", index+1)

		if err != nil {
			assert.Equal(tc.code, err.(*common.AppError).Code, tcMsg)
		} else {
			assert.Equal(string(tc.code), "", tcMsg)
		}
	}
}
