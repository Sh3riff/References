//////////////// Data Models /////////////////

1. Data Model Design
   - Embedded 
   - Normalized data

2. Model Relationships Between Documents
  - One-to-One Relationships
    - Embedded Document Pattern // {}
    - Subset Pattern
  - One-to-Many Relationships with Embedded Documents
    - Embedded Document Pattern  // [ {} ]
    - Subset Pattern
    //////////////////////////////////
          // patron document
              {
                 _id: "joe",
                 name: "Joe Bookreader"
              }

          // address documents
              {
                 patron_id: "joe", // reference to patron document
                 street: "123 Fake Street",
                 city: "Faketon",
                 state: "MA",
                 zip: "12345"
              }

              {
                 patron_id: "joe",
                 street: "1 Some Other Street",
                 city: "Boston",
                 state: "MA",
                 zip: "12345"
              }

              {
                 "_id": "joe",
                 "name": "Joe Bookreader",
                 "addresses": [
                              {
                                "street": "123 Fake Street",
                                "city": "Faketon",
                                "state": "MA",
                                "zip": "12345"
                              },
                              {
                                "street": "1 Some Other Street",
                                "city": "Boston",
                                "state": "MA",
                                "zip": "12345"
                              }
                            ]
               }

  - One-to-Many Relationships with Embedded Documents
    
    ////////////////////////////

        {
           title: "MongoDB: The Definitive Guide",
           author: [ "Kristina Chodorow", "Mike Dirolf" ],
           published_date: ISODate("2010-09-24"),
           pages: 216,
           language: "English",

           publisher: {

                      name: "O'Reilly Media",

                      founded: 1980,

                      location: "CA"

                    }

        }

        {
           title: "50 Tips and Tricks for MongoDB Developer",
           author: "Kristina Chodorow",
           published_date: ISODate("2011-05-06"),
           pages: 68,
           language: "English",

           publisher: {

                      name: "O'Reilly Media",

                      founded: 1980,

                      location: "CA"

                    }

        }
       To avoid repetition of the publisher data, use references and keep the publisher information in a separate collection from the book collection.
       When using references, the growth of the relationships determine where to store the reference. If the number of books per publisher is small with limited growth, storing the book reference inside the publisher document may sometimes be useful. Otherwise, if the number of books per publisher is unbounded, this data model would lead to mutable, growing arrays, as in the following example:


       {
           name: "O'Reilly Media",
           founded: 1980,
           location: "CA",

           books: [123456789, 234567890, ...]

        }

        {
            _id: 123456789,
            title: "MongoDB: The Definitive Guide",
            author: [ "Kristina Chodorow", "Mike Dirolf" ],
            published_date: ISODate("2010-09-24"),
            pages: 216,
            language: "English"
        }

        {
           _id: 234567890,
           title: "50 Tips and Tricks for MongoDB Developer",
           author: "Kristina Chodorow",
           published_date: ISODate("2011-05-06"),
           pages: 68,
           language: "English"
        }

        To avoid mutable, growing arrays, store the publisher reference inside the book document:

        {
           _id: "oreilly",
           name: "O'Reilly Media",
           founded: 1980,
           location: "CA"
        }

        {
           _id: 123456789,
           title: "MongoDB: The Definitive Guide",
           author: [ "Kristina Chodorow", "Mike Dirolf" ],
           published_date: ISODate("2010-09-24"),
           pages: 216,
           language: "English",

           publisher_id: "oreilly"

        }

        {
           _id: 234567890,
           title: "50 Tips and Tricks for MongoDB Developer",
           author: "Kristina Chodorow",
           published_date: ISODate("2011-05-06"),
           pages: 68,
           language: "English",

           publisher_id: "oreilly"

        }

3.
