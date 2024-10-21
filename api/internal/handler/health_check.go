package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// TODO: handle health check + rate limiting
func HandleHealthCheck(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{"message": "OK"})
}
