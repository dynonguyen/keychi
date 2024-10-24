package common

type I18nCode string

const (
	CodeInternalServerError I18nCode = "INTERNAL_SERVER_ERROR"
	CodeBadRequestError     I18nCode = "BAD_REQUEST"
	CodeUnauthorizedError   I18nCode = "UNAUTHORIZED"
)

func (i I18nCode) Error() string {
	return string(i)
}
