package main

import (
	"log"
	"os"

	"github.com/dynonguyen/keychi/api/internal/controller"
	"github.com/dynonguyen/keychi/api/internal/handler"
	"github.com/dynonguyen/keychi/api/internal/middleware"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	echoMiddleware "github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Cannot load .env file")
	}

	// Connect to database
	dsn := os.Getenv("POSTGRES_DSN")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("Cannot connect database %v", err)
	}

	// Initialize server
	e := echo.New()

	// Config middlewares
	e.HTTPErrorHandler = middleware.NewHTTPErrorHandler

	e.Use(echoMiddleware.Recover())
	e.Use(middleware.NewLoggerMiddleware())

	// Config controllers
	v1Routing := e.Group(os.Getenv("BASE_URL") + "/v1")
	controller.NewHealthCheckController(v1Routing)
	v1Routing.POST("/users", handler.HandleCreateUser(db))

	// Start server
	e.Logger.Fatal(e.Start(os.Getenv("API_HOST")))
}
