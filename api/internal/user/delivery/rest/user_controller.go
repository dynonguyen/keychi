package rest

import (
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/middleware"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/labstack/echo/v4"
)

func UserController(g *echo.Group, storage *infra.PgsqlStorage, authSvc service.AuthService) {
	g.POST("/user", HandleRegisterUser(storage, authSvc))
	g.POST("/login", HandleLogin(storage, authSvc))
	g.GET("/user", HandleGetUser(storage), middleware.UserAuth(authSvc))
}
