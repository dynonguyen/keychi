package util

import (
	"crypto/rand"
	"encoding/base64"
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

func GenerateString(length int) string {
	// Calculate the number of bytes needed
	byteLength := (length*6 + 7) / 8
	randomBytes := make([]byte, byteLength)

	if _, err := rand.Read(randomBytes); err != nil {
		return ""
	}

	// Encode to Base64 and trim to the desired length
	return base64.URLEncoding.EncodeToString(randomBytes)[:length]
}

func RegisterEnumValidator(v *validator.Validate, key string, values []string) {
	v.RegisterValidation(key, func(fl validator.FieldLevel) bool {
		for _, v := range values {
			if v == fl.Field().String() {
				return true
			}
		}
		return false
	})
}

func CamelToSnake(s string) string {
	var res []rune
	for i, c := range s {
		if 'A' <= c && c <= 'Z' {
			if i > 0 {
				res = append(res, '_')
			}
			res = append(res, c+'a'-'A')
		} else {
			res = append(res, c)
		}
	}
	return string(res)
}

func CamelKeysToSnake(m map[string]interface{}) map[string]interface{} {
	res := make(map[string]interface{})
	for k, v := range m {
		res[CamelToSnake(k)] = v
	}
	return res
}
