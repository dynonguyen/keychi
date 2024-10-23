package rest

import (
	"github.com/labstack/echo/v4"
	"keychi.org/api/internal/infra"
)

func AdminController(g *echo.Group, storage *infra.PgsqlStorage) {
	g.POST("/health-check", HandleHealthCheck(storage))
}
