package main

import (
	"errors"
	"log"
	"net/http"
	"os"

	"github.com/dynonguyen/keychi/api/internal/common"
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
		return c.JSON(http.StatusBadRequest, common.NewBadRequestError(&common.AppError{
			Status:  100,
			Message: "invalid request",
			Code:    "ABC",
			RootErr: &common.AppError{
				Status:  100,
				Message: "invalid request",
				Code:    "ABC",
				RootErr: errors.New("con meo con 2"),
			},
		}, "invalid request", "BAD_REQUEST"))
	})
	e.POST("/user", handler.HandleCreateUser(db))

	// Start server
	e.Logger.Fatal(e.Start(os.Getenv("API_HOST")))
}
