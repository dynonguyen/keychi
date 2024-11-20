package rest

import (
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/middleware"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/repository/postgres"
	"github.com/labstack/echo/v4"
)

func UserController(g *echo.Group, storage *infra.PgsqlStorage, authSvc service.AuthService) {
	userMiddleware := middleware.UserAuth(storage, authSvc)
	repo := postgres.NewAuthRepo(storage)

	g.POST("/pre-login", HandlePreLogin(authSvc, repo))
	g.POST("/login", HandleLogin(authSvc, repo))
	g.POST("/logout", HandleLogout(authSvc, repo))

	g.POST("/user", HandleRegisterUser(storage, authSvc))
	g.GET("/user", HandleGetUser(storage), userMiddleware)
}
