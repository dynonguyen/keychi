package main

import (
	"log"
	"os"

	"github.com/dynonguyen/keychi/api/internal/handler"
	"github.com/dynonguyen/keychi/api/internal/middleware"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
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
	e.Use(middleware.NewLoggerMiddleware())

	// Config controllers
	e.GET("/", func(c echo.Context) error {
		return c.JSON(200, map[string]string{"message": "OK"})
	})
	e.POST("/user", handler.HandleCreateUser(db))

	// Start server
	e.Logger.Fatal(e.Start(os.Getenv("API_HOST")))
}
