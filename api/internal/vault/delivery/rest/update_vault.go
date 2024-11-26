package rest

import (
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/util"
	"github.com/dynonguyen/keychi/api/internal/vault/dto"
	"github.com/dynonguyen/keychi/api/internal/vault/repository/postgres"
	"github.com/dynonguyen/keychi/api/internal/vault/usecase"
	"github.com/labstack/echo/v4"
)

// @Summary Update a vault
// @Tags Vault
// @Param vault body dto.UpdateVaultInput true "updated vault information"
// @Success 200 {object} string
// @Failure 401 {object} common.AppError
// @Failure 400 {object} common.AppError
// @Failure 500 {object} common.AppError
// @Security	Bearer
// @Router /vault [put]
func HandleUpdateVault(s *infra.PgsqlStorage) echo.HandlerFunc {
	return func(c echo.Context) error {
		var vault dto.UpdateVaultInput

		if err := (&echo.DefaultBinder{}).BindBody(c, &vault); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, common.CodeBadRequestError))
		}

		repo := postgres.NewVaultRepository(s)
		uc := usecase.NewUpdateVaultUsecase(repo)
		userID := util.GetUserFromContext(c).ID

		if err := uc.UpdateVault(c.Request().Context(), userID, &vault); err != nil {
			return c.JSON(common.GetAppErrorStatus(err, http.StatusInternalServerError), err)
		}

		return c.JSON(http.StatusOK, common.NewOkResponse("ok"))
	}
}
