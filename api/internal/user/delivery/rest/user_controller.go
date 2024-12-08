package rest

import (
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/middleware"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/labstack/echo/v4"
)

func UserController(g *echo.Group, storage *infra.PgsqlStorage, authSvc service.AuthService) {
	userMiddleware := middleware.UserAuth(storage, authSvc)

	g.POST("/login", HandleLogin(authSvc))
	g.POST("/logout", HandleLogout(authSvc))

	g.POST("/user", HandleRegisterUser(storage, authSvc))
	g.GET("/profile", HandleGetProfile(storage), userMiddleware)
	g.PATCH("/profile/preferences", HandleUpdateUserPreferences(storage), userMiddleware)
}
