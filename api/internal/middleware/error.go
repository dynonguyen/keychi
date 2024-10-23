package middleware

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"keychi.org/api/internal/common"
)

func HTTPErrorHandler(err error, c echo.Context) {
	if err == nil {
		return
	}

	status := http.StatusInternalServerError

	httpErr := new(echo.HTTPError)
	if errors.As(err, &httpErr) {
		status = httpErr.Code
	}

	c.JSON(status, common.NewAppErrorResponse(status, err, err.Error(), common.CodeInternalServerError))
}
