package database

import (
	"context"
	"fmt"
	"log/slog"
	"strconv"
	"strings"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

func exec(query string, args ...any) (pgconn.CommandTag, error) {

	commandTag, err := DBConn.Exec(context.Background(), query, args...)

	if err != nil {
		slog.Error("Error running DB Exec command",
			"Query: ", query,
			"Error: ", err.Error(),
		)
	}
	// if commandTag.RowsAffected() != 1 {
	// 	return errors.New("no row found to delete")
	// }

	return commandTag, err
}

func findOne[T any](query string, args ...any) (T, error) {
	var noData T
	rows, err := DBConn.Query(context.Background(), query, args...)
	if err != nil {
		slog.Error("Error running DB fineOne command",
			"Query: ", query,
			"Error: ", err.Error(),
		)
		return noData, err
	}

	result, err := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[T])

	if err != nil {
		slog.Error("Error collecting row to struct in fineOne command",
			"rows ", rows,
			"Query: ", query,
			"Error: ", err.Error(),
		)
		return noData, err
	}

	return result, err
}

func find[T any](query string, args ...any) (data []T, err error) {
	rows, rowErr := DBConn.Query(context.Background(), query, args...)

	if rowErr != nil {
		slog.Error("Error running find command",
			"Query: ", query,
			"Error: ", rowErr.Error(),
		)
		return []T{}, rowErr
	}

	result, collectErr := pgx.CollectRows(rows, pgx.RowToStructByName[T])
	if collectErr != nil {
		slog.Error("Error collecting rows to struct in find command",
			"Query: ", query,
			"rows ", rows,
			"Error: ", collectErr.Error(),
		)
		return []T{}, collectErr
	}

	return result, nil
}

func stringToInt(val string, defaultVal int) int {
	if i, err := strconv.Atoi(val); err == nil {
		return i
	}
	return defaultVal
}

func paginationQuery(meta PageMetaType) string {
	return fmt.Sprintf(`ORDER BY id %s LIMIT %d OFFSET %d`, meta.Order, meta.Limit, meta.Offset)
}

func paginationMeta(count int, config PageConfig) PageMetaType {
	defaultLimit := 20
	defaultPage := 1
	defaultOrder := "DESC"
	limit := stringToInt(config.Limit, defaultLimit) // default 20
	page := stringToInt(config.Page, defaultPage)    // default 1

	// validate limit
	if limit < 10 || limit > 100 {
		limit = defaultLimit
	}

	// validate page
	if page < 1 {
		page = defaultPage
	}

	// validate order
	if strings.ToUpper(config.Order) == "ASC" {
		defaultOrder = strings.ToUpper(config.Order)
	}

	return PageMetaType{
		Count:         count,
		Limit:         limit,
		CurrentPage:   page,
		NumberOfPages: (count + limit - 1) / limit, // ceil division
		Offset:        (page - 1) * limit,
		Order:         defaultOrder,
	}
}

// func validateLimit(limitString string) int {
// 	defaultLimit := 20
// 	limit := stringToInt(limitString, defaultLimit)
// 	if limit < 10 || limit > 100 {
// 		return defaultLimit
// 	}
// 	return limit
// }
