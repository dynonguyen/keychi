package rest

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"keychi.org/api/internal/common"
	"keychi.org/api/internal/infra"
	"keychi.org/api/internal/user/dto"
	"keychi.org/api/internal/user/repository/postgres"
	"keychi.org/api/internal/user/usecase"
)

func HandleRegisterUser(s *infra.PgsqlStorage) echo.HandlerFunc {
	return func(c echo.Context) error {
		var user dto.UserRegistration

		if err := (&echo.DefaultBinder{}).BindBody(c, &user); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, err.Error(), common.CodeBadRequestError))
		}

		repo := postgres.NewRegisterUserRepo(s)
		uc := usecase.NewRegisterUserUsecase(repo)

		if err := uc.RegisterUser(c.Request().Context(), &user); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, err.Error(), common.CodeBadRequestError))
		}

		return c.JSON(http.StatusOK, &user)
	}
}
