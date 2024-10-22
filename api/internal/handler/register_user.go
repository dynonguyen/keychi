package handler

import (
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/repository"
	"github.com/dynonguyen/keychi/api/internal/usecase"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func HandleRegisterUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var user usecase.UserRegistration

		if err := (&echo.DefaultBinder{}).BindBody(c, &user); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, err.Error(), common.CodeBadRequestError))
		}

		storage := repository.NewPgsqlStorage(db)
		uc := usecase.NewRegisterUserUC(storage)

		if err := uc.RegisterUser(c.Request().Context(), &user); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, err.Error(), common.CodeBadRequestError))
		}

		return c.JSON(http.StatusOK, &user)
	}
}
