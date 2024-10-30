package dto

type HealthCheckResponse struct {
	DbConnected bool `json:"dbConnected"`
}
