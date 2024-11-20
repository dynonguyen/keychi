package common

import (
	"errors"
	"net/http"
)

type AppError struct {
	Status  int      `json:"status,omitempty"`
	Message string   `json:"message,omitempty"`
	Code    I18nCode `json:"code,omitempty"` // Client error code (i18n key)
	RootErr error    `json:"-"`
}

// Get the root error
func (e *AppError) RootError() error {
	if err, ok := e.RootErr.(*AppError); ok {
		return err.RootError()
	}

	return e.RootErr
}

// Implement the custom error
func (e *AppError) Error() string {
	return e.RootError().Error()
}

func NewAppErrorResponse(status int, rootError error, code I18nCode) *AppError {
	if rootError == nil {
		rootError = errors.New("Unknown error")
	}

	return &AppError{
		Status:  status,
		Message: rootError.Error(),
		Code:    code,
		RootErr: rootError,
	}
}

func NewBadRequestError(rootError error, code I18nCode) *AppError {
	return NewAppErrorResponse(http.StatusBadRequest, rootError, code)
}

func NewInternalServerError(rootError error, code I18nCode) *AppError {
	return NewAppErrorResponse(http.StatusInternalServerError, rootError, code)
}

func NewUnauthorizedError(rootError error, code I18nCode) *AppError {
	return NewAppErrorResponse(http.StatusUnauthorized, rootError, code)
}

func GetAppErrorStatus(err error, defaultStatus int) int {
	if appErr, ok := err.(*AppError); ok {
		return appErr.Status
	}

	return defaultStatus
}
