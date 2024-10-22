package middleware

import (
	"errors"
	"net/http"
	"os"
	"strings"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/labstack/echo/v4"
)

const (
	ErrorInvalidToken = "invalid token"
)

func AdminAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		bearerKey := c.Request().Header.Get("Authorization")
		apiKey := strings.Replace(bearerKey, "Bearer ", "", 1)

		if apiKey == os.Getenv("ADMIN_API_KEY") {
			return next(c)
		}

		return c.JSON(http.StatusUnauthorized, common.NewUnauthorizedError(errors.New(ErrorInvalidToken), ErrorInvalidToken, common.CodeUnauthorizedError))
	}
}
