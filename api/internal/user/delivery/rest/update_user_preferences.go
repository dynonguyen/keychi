package rest

import (
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/repository/postgres"
	"github.com/dynonguyen/keychi/api/internal/user/usecase"
	"github.com/dynonguyen/keychi/api/internal/util"
	"github.com/labstack/echo/v4"
)

func HandleUpdateUserPreferences(s *infra.PgsqlStorage) echo.HandlerFunc {
	return func(c echo.Context) error {
		repo := postgres.NewProfileRepository(s)
		uc := usecase.NewProfileUsecase(repo)

		id := util.GetUserFromContext(c).ID

		var input dto.UserPreferencesInput
		if err := (&echo.DefaultBinder{}).BindBody(c, &input); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, common.CodeBadRequestError))
		}

		err := uc.UpdateUserPreferences(c.Request().Context(), id, &input)
		if err != nil {
			return c.JSON(common.GetAppErrorStatus(err, http.StatusInternalServerError), err)
		}
		return c.JSON(http.StatusOK, common.NewOkResponse[interface{}](nil))
	}
}
