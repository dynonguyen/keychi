package rest

import (
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/usecase"
	"github.com/labstack/echo/v4"
)

// @Summary Login
// @Tags User
// @Param user body dto.UserLoginInput true "Login input"
// @Success 200 {object} dto.UserToken
// @Failure 400 {object} common.AppError
// @Failure 500 {object} common.AppError
// @Router /login [post]
func HandleLogin(authSvc service.AuthService) echo.HandlerFunc {
	return func(c echo.Context) error {
		var user dto.UserLoginInput

		if err := (&echo.DefaultBinder{}).BindBody(c, &user); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, common.CodeBadRequestError))
		}

		uc := usecase.NewAuthUsecase(authSvc)

		userToken, err := uc.Login(c.Request().Context(), &user)

		if err != nil {
			return c.JSON(common.GetAppErrorStatus(err, http.StatusUnauthorized), err)
		}

		return c.JSON(http.StatusOK, common.NewOkResponse(&userToken))
	}
}

// @Summary Logout
// @Tags User
// @Param user body dto.UserLogout true "User logout input"
// @Success 200 {object} string
// @Failure 400 {object} common.AppError
// @Failure 500 {object} common.AppError
// @Router /logout [post]
func HandleLogout(authSvc service.AuthService) echo.HandlerFunc {
	return func(c echo.Context) error {
		var body dto.UserLogout

		if err := (&echo.DefaultBinder{}).BindBody(c, &body); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, common.CodeBadRequestError))
		}

		uc := usecase.NewAuthUsecase(authSvc)

		if err := uc.Logout(c.Request().Context(), body.RefreshToken); err != nil {
			return c.JSON(common.GetAppErrorStatus(err, http.StatusUnauthorized), err)
		}

		return c.JSON(http.StatusOK, common.NewOkResponse("Ok"))
	}
}
