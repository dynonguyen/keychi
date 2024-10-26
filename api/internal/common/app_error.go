package common

import (
	"errors"
	"net/http"
)

type appError struct {
	Status  int      `json:"status,omitempty"`
	Message string   `json:"message,omitempty"`
	Code    I18nCode `json:"code,omitempty"` // Client error code (i18n key)
	RootErr error    `json:"-"`
}

// Get the root error
func (e *appError) RootError() error {
	if err, ok := e.RootErr.(*appError); ok {
		return err.RootError()
	}

	return e.RootErr
}

// Implement the custom error
func (e *appError) Error() string {
	return e.RootError().Error()
}

func NewAppErrorResponse(status int, rootError error, code I18nCode) *appError {
	if rootError == nil {
		rootError = errors.New("Unknown error")
	}

	return &appError{
		Status:  status,
		Message: rootError.Error(),
		Code:    code,
		RootErr: rootError,
	}
}

func NewBadRequestError(rootError error, code I18nCode) *appError {
	return NewAppErrorResponse(http.StatusBadRequest, rootError, code)
}

func NewInternalServerError(rootError error, code I18nCode) *appError {
	return NewAppErrorResponse(http.StatusInternalServerError, rootError, code)
}

func NewUnauthorizedError(rootError error, code I18nCode) *appError {
	return NewAppErrorResponse(http.StatusUnauthorized, rootError, code)
}

func GetAppErrorStatus(err error, defaultStatus int) int {
	if appErr, ok := err.(*appError); ok {
		return appErr.Status
	}

	return defaultStatus
}
