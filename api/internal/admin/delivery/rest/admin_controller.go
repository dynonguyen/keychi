package rest

import (
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/labstack/echo/v4"
)

func AdminController(g *echo.Group, storage *infra.PgsqlStorage) {
	g.POST("/health-check", HandleHealthCheck(storage))
}
