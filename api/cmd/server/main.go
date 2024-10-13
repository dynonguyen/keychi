package main

import (
	"log"
	"os"

	"github.com/dynonguyen/keychi/api/internal/handler"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Cannot load .env file")
	}

	dsn := os.Getenv("POSTGRES_DSN")

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	echoServer := echo.New()
	echoServer.POST("/user", handler.HandleCreateUser(db))

	echoServer.Logger.Fatal(echoServer.Start(os.Getenv("API_HOST")))
}
