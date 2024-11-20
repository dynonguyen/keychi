package common

import "net/http"

type AppResponse[T any] struct {
	Status int `json:"status,omitempty"`
	Data   T   `json:"data"`
}

func NewOkResponse[T any](data T) *AppResponse[T] {
	return &AppResponse[T]{
		Status: http.StatusOK,
		Data:   data,
	}
}

func NewCreatedResponse[T any](data T) *AppResponse[T] {
	return &AppResponse[T]{
		Status: http.StatusCreated,
		Data:   data,
	}
}
