package database

type PageConfig struct {
	Limit string
	Page  string
	Order string
}

type PageMetaType struct {
	Count         int    `json:"count"`
	Limit         int    `json:"limit"`
	CurrentPage   int    `json:"currentPage"`
	NumberOfPages int    `json:"numberOfPages"`
	Offset        int    `json:"offset"`
	Order         string `json:"order"`
}
