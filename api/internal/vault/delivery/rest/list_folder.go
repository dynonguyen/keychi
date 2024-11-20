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

// @Summary List of user folders
// @Tags Vault
// @Success 200 {object} []model.Folder
// @Failure 401 {object} common.AppError
// @Failure 400 {object} common.AppError
// @Failure 500 {object} common.AppError
// @Security	Bearer
// @Router /vault/folders [get]
func HandleListFolder(s *infra.PgsqlStorage) echo.HandlerFunc {
	return func(c echo.Context) error {
		repo := postgres.NewFolderRepository(s)
		uc := usecase.NewListFolderUsecase(repo)

		userID := util.GetUserFromContext(c).ID
		folders, err := uc.ListFolder(c.Request().Context(), userID)

		if err != nil {
			return c.JSON(common.GetAppErrorStatus(err, http.StatusInternalServerError), err)
		}

		return c.JSON(http.StatusOK, common.NewOkResponse(folders))
	}
}
