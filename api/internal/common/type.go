package common

type Map[T any] map[string]T
type Json = Map[any]
type JsonString = map[string]string

type TransactionManager interface {
	WithTransaction(func() error) error
}

type EntityCreationResponse struct {
	ID int `json:"id"`
}
