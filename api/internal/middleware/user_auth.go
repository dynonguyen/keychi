package middleware

import (
	"errors"
	"net/http"
	"strings"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/model"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

var (
	errInvalidToken = common.NewUnauthorizedError(errors.New("invalid token"), common.CodeUnauthorizedError)
)

var userIdCache = make(map[string]int)

func UserAuth(storage *infra.PgsqlStorage, authSvc service.AuthService) func(next echo.HandlerFunc) echo.HandlerFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			bearerKey := c.Request().Header.Get("Authorization")
			token := strings.Replace(bearerKey, "Bearer ", "", 1)

			if token == "" {
				return c.JSON(http.StatusUnauthorized, errInvalidToken)
			}

			tokenInfo, err := authSvc.DecodeToken(c.Request().Context(), token)

			if err != nil || (tokenInfo == nil || tokenInfo.Email == "") {
				return c.JSON(http.StatusUnauthorized, errInvalidToken)
			}

			userEmail := tokenInfo.Email
			userId, ok := userIdCache[userEmail]
			if !ok {
				user := model.UserModel{}
				result := storage.DB.Where("email = ?", userEmail).Select("id").Take(&user)

				if result.Error == gorm.ErrRecordNotFound {
					return c.JSON(http.StatusUnauthorized, errInvalidToken)
				}

				userId = user.ID
				userIdCache[userEmail] = userId
			}

			c.Set("userId", userId)
			c.Set("userEmail", userEmail)

			return next(c)
		}
	}
}
