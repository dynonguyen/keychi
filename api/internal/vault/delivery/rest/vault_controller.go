package rest

import (
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/labstack/echo/v4"
)

// Root path: /vault
func VaultController(g *echo.Group, storage *infra.PgsqlStorage) {
	g.POST("/folder", HandleCreateFolder(storage))
	g.DELETE("/folder/:id", HandleDeleteFolder(storage))
	g.GET("/folders", HandleListFolder(storage))
}
