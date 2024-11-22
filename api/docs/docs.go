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
                        "description": "Login input",
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
                    },
                    "500": {
                        "description": "Internal Server Error",
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
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/common.AppError"
                        }
                    }
                }
            }
        },
        "/profile": {
            "get": {
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "tags": [
                    "User"
                ],
                "summary": "Get User Profile",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/dto.UserProfile"
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
        },
        "/user": {
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
                    },
                    "500": {
                        "description": "Internal Server Error",
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
                "parameters": [
                    {
                        "description": "New folder information",
                        "name": "folder",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.NewFolderInput"
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
            },
            "patch": {
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "tags": [
                    "Vault"
                ],
                "summary": "Update a folder",
                "parameters": [
                    {
                        "description": "updated folder information",
                        "name": "folder",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.UpdateFolderInput"
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
        },
        "/vault/folder/{id}": {
            "delete": {
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "tags": [
                    "Vault"
                ],
                "summary": "Delete a folder",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Folder ID",
                        "name": "id",
                        "in": "path",
                        "required": true
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
        },
        "/vault/folders": {
            "get": {
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "tags": [
                    "Vault"
                ],
                "summary": "List of user folders",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Folder"
                            }
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
                "name"
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
                }
            }
        },
        "dto.UpdateFolderInput": {
            "type": "object",
            "required": [
                "folderId"
            ],
            "properties": {
                "color": {
                    "type": "string"
                },
                "folderId": {
                    "type": "integer"
                },
                "icon": {
                    "type": "string"
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
        "dto.UserProfile": {
            "type": "object",
            "properties": {
                "avatar": {
                    "type": "string"
                },
                "createdAt": {
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
                },
                "preferences": {
                    "$ref": "#/definitions/model.UserPreferencesModel"
                },
                "pwdHint": {
                    "type": "string"
                },
                "updatedAt": {
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
        },
        "entity.KdfAlgorithm": {
            "type": "string",
            "enum": [
                "pbkdf2",
                "argon2"
            ],
            "x-enum-varnames": [
                "PBKDF2",
                "Argon2"
            ]
        },
        "entity.UserLanguage": {
            "type": "string",
            "enum": [
                "en",
                "vi"
            ],
            "x-enum-varnames": [
                "English",
                "Vietnamese"
            ]
        },
        "entity.UserThemeMode": {
            "type": "string",
            "enum": [
                "light",
                "dark",
                "system"
            ],
            "x-enum-varnames": [
                "Light",
                "Dark",
                "System"
            ]
        },
        "entity.VaultAction": {
            "type": "string",
            "enum": [
                "lock",
                "logout"
            ],
            "x-enum-varnames": [
                "Lock",
                "Logout"
            ]
        },
        "model.Folder": {
            "type": "object",
            "properties": {
                "color": {
                    "type": "string"
                },
                "createdAt": {
                    "type": "string"
                },
                "icon": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "updatedAt": {
                    "type": "string"
                },
                "userId": {
                    "type": "integer"
                }
            }
        },
        "model.UserPreferencesModel": {
            "type": "object",
            "properties": {
                "createdAt": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "kdfAlgorithm": {
                    "$ref": "#/definitions/entity.KdfAlgorithm"
                },
                "kdfIterations": {
                    "type": "integer"
                },
                "kdfMemory": {
                    "type": "integer"
                },
                "kdfParallelism": {
                    "type": "integer"
                },
                "kdfSalt": {
                    "type": "string"
                },
                "language": {
                    "$ref": "#/definitions/entity.UserLanguage"
                },
                "theme": {
                    "$ref": "#/definitions/entity.UserThemeMode"
                },
                "updatedAt": {
                    "type": "string"
                },
                "userId": {
                    "type": "integer"
                },
                "vaultTimeout": {
                    "type": "integer"
                },
                "vaultTimeoutAction": {
                    "$ref": "#/definitions/entity.VaultAction"
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
