package controller

import (
	"github.com/dynonguyen/keychi/api/internal/handler"
	"github.com/labstack/echo/v4"
)

func NewHealthCheckController(g *echo.Group) {
	g.POST("/health-check", handler.HandleHealthCheck)
}
