package rest

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"keychi.org/api/internal/common"
	"keychi.org/api/internal/infra"
)

func HandleHealthCheck(s *infra.PgsqlStorage) echo.HandlerFunc {
	return func(c echo.Context) error {
		connection := struct {
			DbConnected bool `json:"dbConnected"`
		}{DbConnected: true}

		if sqlDb, err := s.DB.DB(); err != nil || sqlDb.Ping() != nil {
			connection.DbConnected = false
		}

		return c.JSON(http.StatusOK, common.NewOkResponse(connection))
	}
}
