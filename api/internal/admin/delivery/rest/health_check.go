package rest

import (
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/labstack/echo/v4"
)

// @Summary	Health check
// @Description
// @Tags		Admin
// @Success	200	{object}	common.appResponse
// @Failure	401	{object}	common.appError
// @Router		/admin/health-check [post]
// @Security	Bearer
func HandleHealthCheck(s *infra.PgsqlStorage) echo.HandlerFunc {
	return func(c echo.Context) error {
		connection := struct {
			DbConnected bool `json:"dbConnected"`
		}{DbConnected: true}

		if sqlDb, err := s.DB.DB(); err != nil || sqlDb.Ping() != nil {
			connection.DbConnected = false
		}

		return c.JSON(http.StatusOK, common.NewOkResponse(&connection))
	}
}
