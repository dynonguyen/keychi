package config

import (
	"fmt"
	"os"

	"github.com/labstack/echo/v4"
	echoSwagger "github.com/swaggo/echo-swagger"
	"github.com/swaggo/swag"
)

// @title          	Keychi API
// @version         1.0
// @description     Keychi | The best password manager for securely storing, managing data such as passwords, passkeys, OTP and credit cards.

// @tag.name					Admin
// @tag.description		Manage services, health check and other admin tasks.

// @tag.name					User
// @tag.description		Manage user account, authentication and authorization.

// @contact.name   Keychi Team
// @contact.url    https://github.com/dynonguyen/keychi

// @schemes		http https

// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
func SwaggerConfig(doc *swag.Spec, basePath string) echo.HandlerFunc {
	doc.Host = os.Getenv("API_HOST")
	doc.BasePath = basePath

	fmt.Println("-------- SWAGGER API DOC GENERATED --------")

	return echoSwagger.EchoWrapHandler(func(c *echoSwagger.Config) {
		c.PersistAuthorization = true
	})
}
