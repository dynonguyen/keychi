package main

import (
	"log"
	"os"

	adminHandler "github.com/dynonguyen/keychi/api/internal/admin/delivery/rest"
	"github.com/dynonguyen/keychi/api/internal/infra"
	"github.com/dynonguyen/keychi/api/internal/middleware"
	userHandler "github.com/dynonguyen/keychi/api/internal/user/delivery/rest"
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

	// Database & storage
	dsn := os.Getenv("POSTGRES_DSN")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("Cannot connect database %v", err)
	}

	pgStorage := infra.NewPgsqlStorage(db)

	// Initialize server
	e := echo.New()

	// Global middlewares
	e.HTTPErrorHandler = middleware.HTTPErrorHandler

	e.Use(echoMiddleware.Recover())
	e.Use(middleware.CustomLogger())

	// Routes
	v1 := e.Group(os.Getenv("BASE_URL") + "/v1")
	adminGroup := v1.Group("/admin")

	// Route middleware
	adminGroup.Use(middleware.AdminAuth)

	// Route controller
	adminHandler.AdminController(adminGroup, pgStorage)
	userHandler.UserController(v1, pgStorage)

	// Start server
	e.Logger.Fatal(e.Start(os.Getenv("API_HOST")))
}
