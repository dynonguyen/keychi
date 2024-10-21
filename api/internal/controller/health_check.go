package controller

import (
	"github.com/dynonguyen/keychi/api/internal/handler"
	"github.com/labstack/echo/v4"
)

func NewHealthCheckController(g *echo.Group) {
	g.GET("/health-check", handler.HandleHealthCheck)

	g.GET("/", func(c echo.Context) error {
		return c.String(200, "Welcome to Keychi API")
	})
}
