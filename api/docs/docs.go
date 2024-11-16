// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {
            "name": "Keychi Team",
            "url": "https://github.com/dynonguyen/keychi"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/admin/health-check": {
            "post": {
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "tags": [
                    "Admin"
                ],
                "summary": "Health check",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/dto.HealthCheckResponse"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "$ref": "#/definitions/common.AppError"
                        }
                    }
                }
            }
        },
        "/login": {
            "post": {
                "tags": [
                    "User"
                ],
                "summary": "Login",
                "parameters": [
                    {
                        "description": "User login input",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.UserLoginInput"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/dto.UserToken"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/common.AppError"
                        }
                    }
                }
            }
        },
        "/logout": {
            "post": {
                "tags": [
                    "User"
                ],
                "summary": "Logout",
                "parameters": [
                    {
                        "description": "User logout input",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.UserLogout"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/common.AppError"
                        }
                    }
                }
            }
        },
        "/user": {
            "get": {
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "tags": [
                    "User"
                ],
                "summary": "Get User",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/dto.UserInfo"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/common.AppError"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "$ref": "#/definitions/common.AppError"
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "User"
                ],
                "summary": "Register a new user",
                "parameters": [
                    {
                        "description": "dto.UserRegistrationInput",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.UserRegistrationInput"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/common.AppError"
                        }
                    }
                }
            }
        },
        "/vault/folder": {
            "post": {
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "tags": [
                    "Vault"
                ],
                "summary": "Create a new folder",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/dto.NewFolderInput"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/common.AppError"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "$ref": "#/definitions/common.AppError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/common.AppError"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "common.AppError": {
            "type": "object",
            "properties": {
                "code": {
                    "description": "Client error code (i18n key)",
                    "allOf": [
                        {
                            "$ref": "#/definitions/common.I18nCode"
                        }
                    ]
                },
                "message": {
                    "type": "string"
                },
                "status": {
                    "type": "integer"
                }
            }
        },
        "common.I18nCode": {
            "type": "string",
            "enum": [
                "INTERNAL_SERVER_ERROR",
                "BAD_REQUEST",
                "UNAUTHORIZED"
            ],
            "x-enum-varnames": [
                "CodeInternalServerError",
                "CodeBadRequestError",
                "CodeUnauthorizedError"
            ]
        },
        "dto.HealthCheckResponse": {
            "type": "object",
            "properties": {
                "dbConnected": {
                    "type": "boolean"
                }
            }
        },
        "dto.NewFolderInput": {
            "type": "object",
            "required": [
                "name",
                "userId"
            ],
            "properties": {
                "color": {
                    "type": "string"
                },
                "icon": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "userId": {
                    "type": "integer"
                }
            }
        },
        "dto.UserInfo": {
            "type": "object",
            "properties": {
                "avatar": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                }
            }
        },
        "dto.UserLoginInput": {
            "type": "object",
            "required": [
                "email",
                "password"
            ],
            "properties": {
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            }
        },
        "dto.UserLogout": {
            "type": "object",
            "required": [
                "refreshToken"
            ],
            "properties": {
                "refreshToken": {
                    "type": "string"
                }
            }
        },
        "dto.UserRegistrationInput": {
            "type": "object",
            "required": [
                "email",
                "name",
                "password"
            ],
            "properties": {
                "email": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "pwdHint": {
                    "type": "string"
                }
            }
        },
        "dto.UserToken": {
            "type": "object",
            "properties": {
                "accessToken": {
                    "type": "string"
                },
                "expiresIn": {
                    "type": "integer"
                },
                "refreshToken": {
                    "type": "string"
                },
                "tokenType": {
                    "type": "string"
                }
            }
        }
    },
    "securityDefinitions": {
        "Bearer": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    },
    "tags": [
        {
            "description": "Manage services, health check and other admin tasks.",
            "name": "Admin"
        },
        {
            "description": "Manage user account, authentication and authorization.",
            "name": "User"
        }
    ]
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "",
	BasePath:         "",
	Schemes:          []string{"http", "https"},
	Title:            "Keychi API",
	Description:      "Keychi | The best password manager for securely storing, managing data such as passwords, passkeys, OTP and credit cards.",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
