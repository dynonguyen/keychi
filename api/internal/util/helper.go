package util

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"strings"

	"github.com/dynonguyen/keychi/api/internal/common"
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

func GenerateUniqueString(length int) string {
	// Calculate the number of bytes needed
	byteLength := (length*6 + 7) / 8
	randomBytes := make([]byte, byteLength)

	if _, err := rand.Read(randomBytes); err != nil {
		return ""
	}

	// Encode to Base64 and trim to the desired length
	return base64.URLEncoding.EncodeToString(randomBytes)[:length]
}

func StructToMap(obj any) common.Json {
	if obj == nil {
		return nil
	}

	data, err := json.Marshal(obj)
	if err != nil {
		return nil
	}

	result := make(common.Json)
	if err := json.Unmarshal(data, &result); err != nil {
		return nil
	}

	return result
}
