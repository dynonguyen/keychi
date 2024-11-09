package util

import (
	"strings"

	"github.com/labstack/echo/v4"
)

func SplitFullName(name string) (firstName string, lastName string) {
	names := strings.Split(name, " ")

	if len(names) == 1 {
		firstName = names[0]
		return
	}

	firstName = names[0]
	lastName = strings.Join(names[1:], " ")
	return
}

func GetUserFromContext(c echo.Context) string {
	return c.Get("userEmail").(string)
}
