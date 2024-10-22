package controller

import (
	"github.com/dynonguyen/keychi/api/internal/handler"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func AdminController(g *echo.Group, db *gorm.DB) {
	g.POST("/health-check", handler.HandleHealthCheck(db))
}
