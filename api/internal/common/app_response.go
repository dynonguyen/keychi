package common

import "net/http"

type appResponse struct {
	Status int         `json:"status,omitempty"`
	Data   interface{} `json:"data"`
}

func NewOkResponse(data interface{}) *appResponse {
	return &appResponse{
		Status: http.StatusOK,
		Data:   data,
	}
}

func NewCreatedResponse(data interface{}) *appResponse {
	return &appResponse{
		Status: http.StatusCreated,
		Data:   data,
	}
}
