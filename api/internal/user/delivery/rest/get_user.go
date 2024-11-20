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

// @Summary Get User
// @Tags User
// @Success 200 {object} dto.UserInfo
// @Failure 401 {object} common.AppError
// @Failure 400 {object} common.AppError
// @Failure 500 {object} common.AppError
// @Security	Bearer
// @Router /user [get]
func HandleGetUser(s *infra.PgsqlStorage) echo.HandlerFunc {
	return func(c echo.Context) error {
		repo := postgres.NewUserInfoRepository(s)
		uc := usecase.NewGetUserUsecase(repo)

		email := util.GetUserFromContext(c).Email

		user, err := uc.GetUser(c.Request().Context(), email)

		if err != nil {
			return c.JSON(common.GetAppErrorStatus(err, http.StatusBadRequest), err)
		}

		return c.JSON(http.StatusOK, common.NewOkResponse(&user))
	}
}
