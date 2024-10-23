package rest

import (
	"github.com/labstack/echo/v4"
	"keychi.org/api/internal/infra"
)

func UserController(g *echo.Group, storage *infra.PgsqlStorage) {
	g.POST("/register", HandleRegisterUser(storage))
}
