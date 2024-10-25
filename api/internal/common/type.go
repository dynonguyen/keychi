package common

type Map[T any] map[string]T
type Json = Map[interface{}]
