package rest

import (
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/user/repository/postgres"
	"github.com/dynonguyen/keychi/api/internal/user/usecase"
	"github.com/dynonguyen/keychi/api/internal/util"
	"github.com/labstack/echo/v4"
)

// @Summary Get User Profile
// @Tags User
// @Success 200 {object} dto.UserProfile
// @Failure 401 {object} common.AppError
// @Failure 400 {object} common.AppError
// @Failure 500 {object} common.AppError
// @Security	Bearer
// @Router /profile [get]
func HandleGetProfile(s *infra.PgsqlStorage) echo.HandlerFunc {
	return func(c echo.Context) error {
		repo := postgres.NewProfileRepository(s)
		uc := usecase.NewProfileUsecase(repo)

		id := util.GetUserFromContext(c).ID

		user, err := uc.GetUserProfile(c.Request().Context(), id)

		if err != nil {
			return c.JSON(common.GetAppErrorStatus(err, http.StatusBadRequest), err)
		}

		return c.JSON(http.StatusOK, common.NewOkResponse(&user))
	}
}
