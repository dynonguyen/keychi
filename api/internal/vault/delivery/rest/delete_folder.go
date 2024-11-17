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

// @Summary Delete a folder
// @Tags Vault
// @Param        id   path      int  true  "Folder ID"
// @Success 200 {object} string
// @Failure 401 {object} common.AppError
// @Failure 400 {object} common.AppError
// @Failure 500 {object} common.AppError
// @Security	Bearer
// @Router /vault/folder/{id} [delete]
func HandleDeleteFolder(s *infra.PgsqlStorage) echo.HandlerFunc {
	return func(c echo.Context) error {
		var params struct {
			ID int `param:"id"`
		}

		if err := (&echo.DefaultBinder{}).BindPathParams(c, &params); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, common.CodeBadRequestError))
		}

		repo := postgres.NewFolderRepository(s)
		uc := usecase.NewDeleteFolderUsecase(repo)

		if err := uc.DeleteFolder(c.Request().Context(), &dto.DeleteFolderInput{
			UserID:   util.GetUserFromContext(c).ID,
			FolderID: params.ID,
		}); err != nil {
			return c.JSON(common.GetAppErrorStatus(err, http.StatusBadRequest), err)
		}

		return c.JSON(http.StatusOK, common.NewOkResponse("ok"))
	}
}
