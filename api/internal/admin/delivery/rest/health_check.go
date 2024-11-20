package rest

import (
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/admin/dto"
	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/labstack/echo/v4"
)

// @Summary	Health check
// @Description
// @Tags		Admin
// @Success	200	{object}	dto.HealthCheckResponse
// @Failure	401	{object}	common.AppError
// @Security	Bearer
// @Router		/admin/health-check [post]
func HandleHealthCheck(s *infra.PgsqlStorage) echo.HandlerFunc {
	return func(c echo.Context) error {
		connection := dto.HealthCheckResponse{DbConnected: true}

		if sqlDb, err := s.DB.DB(); err != nil || sqlDb.Ping() != nil {
			connection.DbConnected = false
		}

		return c.JSON(http.StatusOK, common.NewOkResponse(&connection))
	}
}
