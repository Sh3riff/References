package database

import (
	"context"
	"fmt"
	utils "kwilax-hq/kwilax-user-server/_utils"
	"log/slog"

	"github.com/jackc/pgx/v5/pgconn"
)

// `WHERE $1::text = ” OR email = $1`,
type Instance[T any] struct {
	TableName    string
	Schema       string
	Indexes      []string
	SelectFields string
}

func (i Instance[T]) getSelectFields() string {
	if i.SelectFields != "" {
		return i.SelectFields
	}
	return "*"
}

func (i Instance[T]) Exec(query string, args ...any) (pgconn.CommandTag, error) {
	return exec(fmt.Sprintf(query, i.TableName), args...)
}

func (i Instance[T]) QueryOne(query string, args ...any) (T, error) {
	return findOne[T](fmt.Sprintf(query, i.TableName), args...)
}
func (i Instance[T]) Query(query string, args ...any) (data []T, err error) {
	return find[T](fmt.Sprintf(query, i.TableName), args...)
}

func (i Instance[T]) FindOne(condition string, args ...any) (data T, error error) {
	findquery := fmt.Sprintf(`SELECT %s FROM %s %s`, i.getSelectFields(), i.TableName, condition)
	return findOne[T](findquery, args...)
}

func (i Instance[T]) FindOneById(id string) (T, error) {
	findquery := fmt.Sprintf(`SELECT %s FROM %s WHERE id = $1`, i.getSelectFields(), i.TableName)
	return findOne[T](findquery, id)
}

func (i Instance[T]) Find(condition string, args ...any) (data []T, err error) {
	query := fmt.Sprintf(`SELECT %s FROM %s %s`, i.getSelectFields(), i.TableName, condition)
	return find[T](query, args...)
}

func (i Instance[T]) FindWithPagination(config PageConfig, condition string, args ...any) (data []T, meta PageMetaType, err error) {

	count := i.Count(condition, args...)
	metaResult := paginationMeta(count, config)

	query := fmt.Sprintf(`SELECT %s FROM %s %s %s`, i.getSelectFields(), i.TableName, condition, paginationQuery(metaResult))

	dbData, err := find[T](query, args...)

	return dbData, metaResult, err
}

func (i Instance[T]) FindAllWithPagination(config PageConfig) (data []T, meta PageMetaType, err error) {
	return i.FindWithPagination(config, "")
}

func (i Instance[T]) Count(condition string, args ...any) int {
	var total int

	query := fmt.Sprintf(`SELECT COUNT(*) FROM %s %s`, i.TableName, condition)

	if err := DBConn.QueryRow(context.Background(), query, args...).Scan(&total); err != nil {
		slog.Error("Error running DB FineOne command",
			"Table: ", i.TableName,
			"Query: ", query,
			"Error: ", err.Error(),
		)
		return 0
	}

	return total
}

func (i Instance[T]) Migrate() {

	if i.TableName == "" || i.Schema == "" {
		panic("Database migration error, tablename & schema required")
	}

	if utils.Env.LOCAL_DEV_MODE {
		return
	}

	// build create table query
	createQuery := fmt.Sprintf(i.Schema, i.TableName)
	if _, err := DBConn.Exec(context.Background(), createQuery); err != nil {
		panic(fmt.Errorf("error creating %s table: %w", i.TableName, err))
	}

	// build optional indices
	for _, idx := range i.Indexes {
		indexQuery := fmt.Sprintf(idx, i.TableName)
		if _, err := DBConn.Exec(context.Background(), indexQuery); err != nil {
			panic(fmt.Errorf("error creating %s index on %s: %w", indexQuery, i.TableName, err))
		}
	}

	slog.Info(fmt.Sprintf("%s table created successfully", i.TableName))
}
