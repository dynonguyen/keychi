package rest

import (
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/repository/postgres"
	"github.com/dynonguyen/keychi/api/internal/user/usecase"
	"github.com/labstack/echo/v4"
)

// @Summary Login
// @Tags User
// @Param user body dto.UserLoginInput false "User login input"
// @Success 200 {object} dto.UserToken
// @Failure 400 {object} common.AppError
// @Router /login [post]
func HandleLogin(s *infra.PgsqlStorage, authSvc service.AuthService) echo.HandlerFunc {
	return func(c echo.Context) error {
		var user dto.UserLoginInput

		if err := (&echo.DefaultBinder{}).BindBody(c, &user); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, common.CodeBadRequestError))
		}

		repo := postgres.NewLoginRepository(s)
		uc := usecase.NewLoginUsecase(repo, authSvc)

		userToken, err := uc.Login(c.Request().Context(), &user)

		if err != nil {
			return c.JSON(common.GetAppErrorStatus(err, http.StatusUnauthorized), err)
		}

		return c.JSON(http.StatusOK, common.NewOkResponse(userToken))
	}
}
