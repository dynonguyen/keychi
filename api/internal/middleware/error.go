package middleware

import (
	"errors"
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/labstack/echo/v4"
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

	c.JSON(status, common.NewAppErrorResponse(status, err, common.CodeInternalServerError))
}
