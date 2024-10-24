package common

import "net/http"

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

func NewUnauthorizedError(rootError error, code I18nCode) *appError {
	return NewAppErrorResponse(http.StatusUnauthorized, rootError, code)
}
