package main

import (
	"log"
	"os"
	"strconv"

	"github.com/dynonguyen/keychi/api/docs"
	adminHandler "github.com/dynonguyen/keychi/api/internal/admin/delivery/rest"
	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/config"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/middleware"
	userHandler "github.com/dynonguyen/keychi/api/internal/user/delivery/rest"
	vaultHandler "github.com/dynonguyen/keychi/api/internal/vault/delivery/rest"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	echoMiddleware "github.com/labstack/echo/v4/middleware"
	"golang.org/x/time/rate"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {

	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Cannot load .env file")
	}

	// Database & storage
	dsn := os.Getenv("POSTGRES_DSN")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("Cannot connect database %v", err)
	}

	pgStorage := infra.NewPgsqlStorage(db)

	// 3rd party services
	keycloakAuthSvc := infra.NewKeycloakAuthService()

	// Initialize server
	e := echo.New()

	// Global middlewares
	e.Use(echoMiddleware.Recover())
	e.Use(echoMiddleware.CORS())
	if (os.Getenv("RATE_LIMIT")) != "" {
		limit, _ := strconv.ParseInt(os.Getenv("RATE_LIMIT"), 10, 0)
		e.Use(echoMiddleware.RateLimiter(echoMiddleware.NewRateLimiterMemoryStore(rate.Limit(limit))))
	}

	e.Use(middleware.CustomLogger())
	e.HTTPErrorHandler = middleware.HTTPErrorHandler

	// Routes
	basePath := os.Getenv("BASE_URL") + "/v1"
	v1 := e.Group(basePath)
	adminGroup := v1.Group("/admin")
	vaultGroup := v1.Group("/vault")

	// Route middleware
	adminGroup.Use(middleware.AdminAuth)
	vaultGroup.Use(middleware.UserAuth(pgStorage, keycloakAuthSvc))

	// Route controller
	adminHandler.AdminController(adminGroup, pgStorage)
	userHandler.UserController(v1, pgStorage, keycloakAuthSvc)
	vaultHandler.VaultController(vaultGroup, pgStorage)

	// API docs
	if os.Getenv("ENV_MODE") != string(common.EnvProd) {
		swaggerHandler := config.SwaggerConfig(docs.SwaggerInfo, basePath)
		v1.GET("/docs/*", swaggerHandler)
	}

	// Start server
	e.Logger.Fatal(e.Start(os.Getenv("API_HOST")))
}
