package handler

import (
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func HandleHealthCheck(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		connection := struct {
			DbConnected bool `json:"dbConnected"`
		}{DbConnected: true}

		if sqlDb, err := db.DB(); err != nil || sqlDb.Ping() != nil {
			connection.DbConnected = false
		}

		return c.JSON(http.StatusOK, common.NewOkResponse(connection))
	}
}
