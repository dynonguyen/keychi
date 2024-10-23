package rest

import (
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/labstack/echo/v4"
)

func UserController(g *echo.Group, storage *infra.PgsqlStorage) {
	g.POST("/user", HandleRegisterUser(storage))
}
