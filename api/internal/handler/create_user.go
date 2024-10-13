package handler

import (
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/entity"
	"github.com/dynonguyen/keychi/api/internal/repository"
	"github.com/dynonguyen/keychi/api/internal/usecase"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func HandleCreateUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var user entity.User
		if err := (&echo.DefaultBinder{}).BindBody(c, &user); err != nil {
			return c.String(http.StatusBadRequest, "Bad request")
		}

		storage := repository.NewPgsqlStorage(db)
		uc := usecase.NewCreateUserUsecase(storage)

		if err := uc.CreateUser(c.Request().Context(), &user); err != nil {
			return c.JSON(http.StatusBadRequest, "Error")
		}

		return c.JSON(http.StatusOK, &user)
	}
}
