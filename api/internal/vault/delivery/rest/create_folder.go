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

// @Summary Create a new folder
// @Tags Vault
// @Param folder body dto.NewFolderInput true "New folder information"
// @Success 200 {object} string
// @Failure 401 {object} common.AppError
// @Failure 400 {object} common.AppError
// @Failure 500 {object} common.AppError
// @Security	Bearer
// @Router /vault/folder [post]
func HandleCreateFolder(s *infra.PgsqlStorage) echo.HandlerFunc {
	return func(c echo.Context) error {
		var folder dto.NewFolderInput

		if err := (&echo.DefaultBinder{}).BindBody(c, &folder); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, common.CodeBadRequestError))
		}

		repo := postgres.NewFolderRepository(s)
		uc := usecase.NewCreateFolderUsecase(repo)
		userID := util.GetUserFromContext(c).ID

		if err := uc.CreateFolder(c.Request().Context(), userID, &folder); err != nil {
			return c.JSON(common.GetAppErrorStatus(err, http.StatusBadRequest), err)
		}

		return c.JSON(http.StatusCreated, common.NewCreatedResponse("ok"))
	}
}
