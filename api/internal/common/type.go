package common

import "context"

type Map[T any] map[string]T
type Json = Map[any]
type JsonString = map[string]string

type TransactionManager interface {
	WithTransaction(ctx context.Context, fn func(txCtx context.Context) error) error
}

type EntityCreationResponse struct {
	ID int `json:"id"`
}
