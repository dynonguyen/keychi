package util

import (
	"strings"

	"github.com/go-playground/validator/v10"
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

func GetUserFromContext(c echo.Context) struct {
	ID    int
	Email string
} {
	return struct {
		ID    int
		Email string
	}{ID: c.Get("userId").(int), Email: c.Get("userEmail").(string)}
}

var _singletonValidate *validator.Validate

func GetValidator() *validator.Validate {
	if _singletonValidate != nil {
		return _singletonValidate
	}

	_singletonValidate = validator.New(validator.WithRequiredStructEnabled())
	return _singletonValidate
}
