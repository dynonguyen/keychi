package middleware

import (
	"errors"
	"net/http"
	"strings"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/labstack/echo/v4"
)

var (
	errInvalidToken = common.NewUnauthorizedError(errors.New("invalid token"), common.CodeUnauthorizedError)
)

func UserAuth(authSvc service.AuthService) func(next echo.HandlerFunc) echo.HandlerFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			bearerKey := c.Request().Header.Get("Authorization")
			token := strings.Replace(bearerKey, "Bearer ", "", 1)

			if token == "" {
				return c.JSON(http.StatusUnauthorized, errInvalidToken)
			}

			tokenInfo, err := authSvc.DecodeToken(c.Request().Context(), token)

			if err != nil || (tokenInfo == nil || tokenInfo.Email == "") {
				return c.JSON(http.StatusUnauthorized, errInvalidToken)
			}

			c.Set("userEmail", tokenInfo.Email)

			return next(c)
		}
	}
}
