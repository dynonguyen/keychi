package common

type EnvMode string

const (
	Dev  EnvMode = "dev"
	Prod EnvMode = "prod"
)

// Common i18n error codes
const (
	CodeInternalServerError = "INTERNAL_SERVER_ERROR"
	CodeBadRequestError     = "BAD_REQUEST_ERROR"
)
