package common

import "net/http"

type AppError struct {
	Status    int    `json:"status,omitempty"`
	Message   string `json:"message,omitempty"`
	Code      string `json:"code,omitempty"` // Client error code (i18n key)
	RootError error  `json:"-"`
}

func NewAppErrorResponse(status int, message string, code string, rootError error) *AppError {
	return &AppError{
		Status:    status,
		Message:   message,
		Code:      code,
		RootError: rootError,
	}
}

func NewBadRequestError(message string, code string, rootError error) *AppError {
	return NewAppErrorResponse(http.StatusBadRequest, message, code, rootError)
}
