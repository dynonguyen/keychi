package main

import (
	"log"
	"os"

	"github.com/dynonguyen/keychi/api/internal/controller"
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
	e.HTTPErrorHandler = middleware.HTTPErrorHandler

	e.Use(echoMiddleware.Recover())
	e.Use(middleware.CustomLogger())

	// Config controllers
	v1 := e.Group(os.Getenv("BASE_URL") + "/v1")

	adminGroup := v1.Group("/admin")
	adminGroup.Use(middleware.AdminAuth)

	controller.AdminController(adminGroup, db)

	// Start server
	e.Logger.Fatal(e.Start(os.Getenv("API_HOST")))
}
