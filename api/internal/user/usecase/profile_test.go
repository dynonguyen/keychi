package usecase

import (
	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
)

var profileTestCases = []struct {
	input dto.UserPreferencesInput
	code  common.I18nCode
}{}
