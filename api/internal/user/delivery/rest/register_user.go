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

func HandleRegisterUser(s *infra.PgsqlStorage, authSvc service.AuthService) echo.HandlerFunc {
	return func(c echo.Context) error {
		var user dto.UserRegistrationInput

		if err := (&echo.DefaultBinder{}).BindBody(c, &user); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, err.Error(), common.CodeBadRequestError))
		}

		repo := postgres.NewRegisterUserRepo(s)
		uc := usecase.NewRegisterUserUsecase(repo, authSvc)

		if err := uc.RegisterUser(c.Request().Context(), &user); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, err.Error(), common.CodeBadRequestError))
		}

		return c.JSON(http.StatusOK, &user)
	}
}
