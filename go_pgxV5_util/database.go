package database

import (
	"context"
	"fmt"

	// "github.com/jackc/pgx/v5" // *pgx.Conn
	"github.com/jackc/pgx/v5/pgxpool"
)

// var DBConnection *pgx.Conn
var DBConn *pgxpool.Pool

func Connect(connString string) {
	var err error
	DBConn, err = pgxpool.New(context.Background(), connString)

	if err != nil {
		panic("failed to connect to DB: " + err.Error())
		// fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		// os.Exit(1)
	}
	fmt.Println("Database Connected")
}
