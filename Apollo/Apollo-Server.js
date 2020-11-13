const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const libraries = [ { branch: 'downtown' }, { branch: 'riverside' } ];

// The branch field of a book indicates which library has it in stock
const books = [
  { title: 'The Awakening', author: 'Kate Chopin', branch: 'riverside'},
  { title: 'City of Glass', author: 'Paul Auster', branch: 'downtown'},
];


// Schema definition
const typeDefs = gql`

# A library has a branch and books
  type Library {
    branch: String!
    books: [Book!]
  }

  # A book has a title and author
  type Book {
    title: String!
    author: Author!
  }

  # An author has a name
  type Author {
    name: String!
  }

  # Queries can fetch a list of libraries
  type Query {
    libraries: [Library]
    books: [Book]
  }
`;

const resolvers = {
    Query: {
        libraries: () => libraries,
        books: () => books
        // books: () => books.filter(book => book.branch === parent.branch)
    },
    Library: {
        books: (parent) => books.filter(book => book.branch === parent.branch)
    },
    Book: {
      author(parent) {
        return {
          name: parent.author
        };
      }
    }

};
