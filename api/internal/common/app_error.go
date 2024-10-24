package common

import "net/http"

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

func NewAppErrorResponse(status int, rootError error, message string, code I18nCode) *AppError {
	return &AppError{
		Status:  status,
		Message: message,
		Code:    code,
		RootErr: rootError,
	}
}

func NewBadRequestError(rootError error, message string, code I18nCode) *AppError {
	return NewAppErrorResponse(http.StatusBadRequest, rootError, message, code)
}

func NewUnauthorizedError(rootError error, message string, code I18nCode) *AppError {
	return NewAppErrorResponse(http.StatusUnauthorized, rootError, message, code)
}
