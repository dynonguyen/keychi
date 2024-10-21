package middleware

import (
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/labstack/echo/v4"
)

func NewHTTPErrorHandler(err error, c echo.Context) {
	if err == nil {
		return
	}

	c.JSON(http.StatusInternalServerError, common.NewAppErrorResponse(http.StatusInternalServerError, err, err.Error(), common.CodeInternalServerError))
}
