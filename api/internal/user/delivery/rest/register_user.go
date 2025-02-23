package rest

import (
	"net/http"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/user/repository/postgres"
	"github.com/dynonguyen/keychi/api/internal/user/usecase"
	"github.com/labstack/echo/v4"
)

// @Summary Register a new user
// @Tags User
// @Param user body dto.UserRegistrationInput true "dto.UserRegistrationInput"
// @Success 201 {object} common.EntityCreationResponse
// @Failure 400 {object} common.AppError
// @Failure 500 {object} common.AppError
// @Router /user [post]
func HandleRegisterUser(s *infra.PgsqlStorage, authSvc service.AuthService) echo.HandlerFunc {
	return func(c echo.Context) error {
		var user dto.UserRegistrationInput

		if err := (&echo.DefaultBinder{}).BindBody(c, &user); err != nil {
			return c.JSON(http.StatusBadRequest, common.NewBadRequestError(err, common.CodeBadRequestError))
		}

		repo := postgres.NewRegisterUserRepo(s)
		uc := usecase.NewRegisterUserUsecase(s, repo, authSvc)

		userID, err := uc.RegisterUser(c.Request().Context(), &user)
		if err != nil {
			return c.JSON(common.GetAppErrorStatus(err, http.StatusBadRequest), err)
		}

		return c.JSON(http.StatusCreated, common.NewCreatedResponse(common.EntityCreationResponse{ID: userID}))
	}
}
