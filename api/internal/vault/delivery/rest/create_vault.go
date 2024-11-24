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

// @Summary Create a new vault
// @Tags Vault
// @Param vault body dto.NewVaultInput true "New vault information"
// @Success 201 {object} common.EntityCreationResponse
// @Failure 401 {object} common.AppError
// @Failure 400 {object} common.AppError
// @Failure 500 {object} common.AppError
// @Security	Bearer
// @Router /vault [post]
func HandleCreateVault(storage *infra.PgsqlStorage) echo.HandlerFunc {
	return func(c echo.Context) error {
		var vault dto.NewVaultInput

		if err := (&echo.DefaultBinder{}).BindBody(c, &vault); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, common.CodeBadRequestError))
		}

		repo := postgres.NewVaultRepository(storage)
		uc := usecase.NewCreateVaultUsecase(repo)

		userID := util.GetUserFromContext(c).ID

		vaultId, err := uc.CreateVault(c.Request().Context(), userID, &vault)
		if err != nil {
			return c.JSON(common.GetAppErrorStatus(err, http.StatusInternalServerError), err)
		}

		return c.JSON(http.StatusCreated, common.NewCreatedResponse(common.EntityCreationResponse{ID: vaultId}))
	}
}
