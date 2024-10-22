package common

import "net/http"

type AppResponse struct {
	Status int         `json:"status,omitempty"`
	Data   interface{} `json:"data"`
}

func NewOkResponse(data interface{}) *AppResponse {
	return &AppResponse{
		Status: http.StatusOK,
		Data:   data,
	}
}
