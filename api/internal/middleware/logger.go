package middleware

import (
	"os"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func CustomLogger() echo.MiddlewareFunc {
	mode := common.EnvMode(os.Getenv("ENV_MODE"))

	var loggerConfig middleware.LoggerConfig

	switch mode {
	case common.Dev:
		loggerConfig = middleware.LoggerConfig{
			Format:           "${time_custom} ${method} ${uri} ${status} ${remote_ip} ${error} ${latency_human}\n",
			CustomTimeFormat: "02-01-2006 15:04:05", // dd-mm-yyyy hh:mm:ss
		}

	case common.Prod:
		loggerConfig = middleware.DefaultLoggerConfig
	}

	return middleware.LoggerWithConfig(loggerConfig)
}
