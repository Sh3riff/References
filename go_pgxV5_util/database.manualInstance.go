package database

import "github.com/jackc/pgx/v5/pgconn"

type ManualInstance[T any] struct{}

func (m ManualInstance[T]) Exec(query string, args ...any) (pgconn.CommandTag, error) {
	return exec(query, args...)
}

func (m ManualInstance[T]) QueryOne(query string, args ...any) (T, error) {
	return findOne[T](query, args...)
}
func (m ManualInstance[T]) Query(query string, args ...any) (data []T, err error) {
	return find[T](query, args...)
}
