package rest

import (
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/util"
	"github.com/dynonguyen/keychi/api/internal/vault/repository/postgres"
	"github.com/dynonguyen/keychi/api/internal/vault/usecase"
	"github.com/labstack/echo/v4"
)

// @Summary Delete a vault
// @Tags Vault
// @Param        id   path      int  true  "Vault ID"
// @Success 200 {object} string
// @Failure 401 {object} common.AppError
// @Failure 400 {object} common.AppError
// @Failure 500 {object} common.AppError
// @Security	Bearer
// @Router /vault/{id} [delete]
func HandleDeleteVault(s *infra.PgsqlStorage) echo.HandlerFunc {
	return func(c echo.Context) error {
		var params struct {
			ID int `param:"id"`
		}

		if err := (&echo.DefaultBinder{}).BindPathParams(c, &params); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, common.CodeBadRequestError))
		}

		repo := postgres.NewVaultRepository(s)
		uc := usecase.NewDeleteVaultUsecase(repo)
		userID := util.GetUserFromContext(c).ID

		if err := uc.DeleteVault(c.Request().Context(), userID, params.ID); err != nil {
			return c.JSON(common.GetAppErrorStatus(err, http.StatusBadRequest), err)
		}

		return c.JSON(http.StatusOK, common.NewOkResponse("ok"))
	}
}
