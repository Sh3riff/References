# Database Sub Package

The database sub-package is lightweight, generic database abstraction layer built on pgx for PostgreSQL. This package provides simple table management and CRUD operations with built-in pagination support.

## Features

- **Safe Table Creation**: Migrate only creates tables if they don't exist
- **Multiple Instances**: Create separate instances for the same table with different configurations
- **Generic Type Safety**: Type-safe operations using Go generics
- **Built-in Pagination**: Automatic pagination with configurable limits, page(for offset) and ordering
- **Flexible Querying**: Support for custom WHERE clauses and field selection
- **Connection Pooling**: Uses pgxpool for efficient database connections

## Connection

Connect is initiated in the server entry file.

```go
"kwilax-hq/kwilax-user-server/utils/database"

func init() {
	... load env variables
    database.Connect(utils.Env.DB_URL)
	...
}
```

> [!NOTE]
> You now have **database.DBConn** as a connected postgres instance

## How it works
Within a package with it struct definition, you create a new instance like so,

```go
"kwilax-hq/kwilax-user-server/utils/database"

type userType struct {
	Id             string    `json:"id"`
	Email          string    `json:"email,omitempty"`
	SensitiveData  string    `json:"sensitiveData,omitempty"`
	CreatedAt      time.Time `json:"createdAt,omitempty"`
}

var Instance = database.Instance[userType]{
	TableName: "users",
	Schema: `
		CREATE TABLE IF NOT EXISTS %s (
			id   varChar(64) PRIMARY KEY,
			email varChar(64) DEFAULT '',
			sensitive_data  varChar(64) DEFAULT '',
			created_at timestamp DEFAULT NOW()
		);
	`,
	Indexes: []string{
		`CREATE INDEX IF NOT EXISTS idx_users_email ON %s (user_id);`,
	},
}
```

| Field | Required | Default | Note |
|-------|----------|---------|-------|
| TableName | ✅ | - | database table |
| Schema | ❌ | - | only required for the migrate method |
| Indexes | ❌ | - | only required for the migrate method if the table has indexes |
| SelectFields | ❌ | * | needed if you are not fetching the entire rows on the table |

> [!TIP]
> You may also create another instance if you need to fetch data into another struct.

```go
type userPublicType struct {
	Id             string    `json:"id"`
	Email          string    `json:"email,omitempty"`
	SensitiveData  string    `json:"sensitiveData,omitempty"`
	CreatedAt      time.Time `json:"createdAt,omitempty"`
}

var publicInStance = database.Instance[userPublicType]{
	TableName: "users",
	SelectFields: "id, created"
}
```


## Pagination
```go
type PageConfig struct {
    Limit string // "20" (default: 20, min: 10, max: 100)
    Page  string // "1" (default: 1)
    Order string // "ASC" or "DESC" (default: "DESC")
}

type PageMetaType struct {
    Count         int    `json:"count"`
    Limit         int    `json:"limit"`
    CurrentPage   int    `json:"currentPage"`
    NumberOfPages int    `json:"numberOfPages"`
    Offset        int    `json:"offset"`
    Order         string `json:"order"`
}
```

## Usage

### Basic CRUD
```go
// Create
result, err := userTable.Exec(
    "INSERT INTO %s (name, email) VALUES ($1, $2)", 
    "John Doe", "john@example.com"
)

// Read
user, err := userTable.FindOneById("123")
user, err := userTable.FindOne("WHERE email = $1", "john@example.com")

// Update
result, err := userTable.Exec(
    "UPDATE %s SET name = $1 WHERE id = $2",
    "Jane Doe", "123"
)

// Delete
result, err := userTable.Exec("DELETE FROM %s WHERE id = $1", "123")
```

### Advanced Queries
```go
// Paginated results with filtering
users, meta, err := userTable.FindMany(PageConfig{
    Limit: "25",
    Page: "2",
    Order: "ASC",
}, "WHERE active = true AND created_at > $1", lastWeek)

// Custom field selection
statsInstance := Instance[User]{
    TableName: "users",
    SelectFields: "COUNT(*) as total, AVG(age) as average_age",
}
```

## Methods
### - Migrate


### - Exec


### - FindOneById


### - FindOne


### - Count


### - FindAll


### - FindMany


## Authors
- [@sh3riff](https://github.com/sh3riff)