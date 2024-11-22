package infra

import (
	"context"
	"errors"
	"net/http"
	"os"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/dynonguyen/keychi/api/internal/service"
	"github.com/dynonguyen/keychi/api/internal/user/dto"
	"github.com/dynonguyen/keychi/api/internal/util"
	"github.com/go-resty/resty/v2"
)

const userLastNamePlaceholder = "_"

type keycloakAuthService struct {
	url          string
	realm        string
	clientId     string
	clientSecret string
}

type keycloakToken struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	ExpiresIn    int    `json:"expires_in"`
	TokenType    string `json:"token_type"`
}

func keycloakTokenToUserToken(token *keycloakToken) *dto.UserToken {
	return &dto.UserToken{
		AccessToken:  token.AccessToken,
		RefreshToken: token.RefreshToken,
		ExpireIn:     token.ExpiresIn,
		TokenType:    token.TokenType,
	}
}

func (k *keycloakAuthService) getClientToken() (*dto.UserToken, error) {
	client := resty.New()
	var result keycloakToken

	_, err := client.R().
		SetHeader("Content-Type", "application/x-www-form-urlencoded").
		SetFormData(common.JsonString{
			"client_id":     k.clientId,
			"client_secret": k.clientSecret,
			"grant_type":    "client_credentials",
		}).
		SetResult(&result).
		Post(k.url + "/realms/" + k.realm + "/protocol/openid-connect/token")

	if err != nil {
		return nil, common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return keycloakTokenToUserToken(&result), nil
}

// Implementing the AuthService interface
func (k *keycloakAuthService) CreateUser(ctx context.Context, user *dto.UserRegistrationInput) error {
	token, tokenErr := k.getClientToken()

	if tokenErr != nil {
		return tokenErr
	}

	client := resty.New()

	firstName, lastName := util.SplitFullName(user.Name)
	if lastName == "" {
		lastName = userLastNamePlaceholder
	}

	payload := common.Json{
		"username":      user.Email,
		"email":         user.Email,
		"credentials":   []common.Json{{"type": "password", "value": user.Password}},
		"firstName":     firstName,
		"lastName":      lastName,
		"enabled":       true,
		"emailVerified": false,
	}

	resp, err := client.R().
		SetHeader("Authorization", token.TokenType+" "+token.AccessToken).
		SetBody(&payload).
		Post(k.url + "/admin/realms/" + k.realm + "/users")

	if err != nil {
		return common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	status := resp.StatusCode()
	if status != http.StatusCreated && status != http.StatusOK {
		return common.NewInternalServerError(errors.New("failed to create user"), common.CodeInternalServerError)
	}

	return nil
}

func (k *keycloakAuthService) GetUserToken(ctx context.Context, email string, password string) (*dto.UserToken, error) {
	client := resty.New()
	var result keycloakToken

	_, err := client.R().
		SetHeader("Content-Type", "application/x-www-form-urlencoded").
		SetFormData(common.JsonString{
			"client_id":     k.clientId,
			"client_secret": k.clientSecret,
			"username":      email,
			"password":      password,
			"grant_type":    "password",
		}).
		SetResult(&result).
		Post(k.url + "/realms/" + k.realm + "/protocol/openid-connect/token")

	if err != nil {
		return nil, common.NewInternalServerError(err, common.CodeInternalServerError)
	}

	return keycloakTokenToUserToken(&result), nil
}

func (k *keycloakAuthService) DecodeToken(ctx context.Context, token string) (*service.TokenInfo, error) {
	client := resty.New()
	var result service.TokenInfo

	_, err := client.R().
		SetHeader("Content-Type", "application/x-www-form-urlencoded").
		SetFormData(common.JsonString{
			"client_id":     k.clientId,
			"client_secret": k.clientSecret,
			"token":         token,
		}).
		SetResult(&result).
		Post(k.url + "/realms/" + k.realm + "/protocol/openid-connect/token/introspect")

	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (k *keycloakAuthService) Logout(ctx context.Context, token string) error {
	client := resty.New()

	resp, _ := client.R().
		SetHeader("Content-Type", "application/x-www-form-urlencoded").
		SetFormData(common.JsonString{
			"client_id":     k.clientId,
			"client_secret": k.clientSecret,
			"refresh_token": token,
		}).
		Post(k.url + "/realms/" + k.realm + "/protocol/openid-connect/logout")

	status := resp.StatusCode()
	if status == http.StatusNoContent || status == http.StatusOK {
		return nil
	}

	return errors.New("Failed to logout")
}

func NewKeycloakAuthService() *keycloakAuthService {
	return &keycloakAuthService{
		url:          os.Getenv("KEYCLOAK_URL"),
		realm:        os.Getenv("KEYCLOAK_REALM"),
		clientId:     os.Getenv("KEYCLOAK_CLIENT_ID"),
		clientSecret: os.Getenv("KEYCLOAK_CLIENT_SECRET"),
	}
}
