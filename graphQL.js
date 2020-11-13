//graphQLSchema.js


const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLList, 
    GraphQLNonNull, 
    GraphQLInt, 
    GraphQLScalarType, 
    GraphQLID 
} = require('graphql');

const Book = require('./models/Book');
const Author = require('./models/Author');

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString)},
        id: { type: GraphQLNonNull(GraphQLID)},
        genre: { type: GraphQLNonNull(GraphQLString)},
        authorId: { type: GraphQLNonNull(GraphQLID)},
        author: {
            type: AuthorType,
            resolve: ( parent, args ) => {
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'author',
    description: 'This represents author of a book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID)},
        name: { type: GraphQLNonNull(GraphQLString)},
        age: { type: GraphQLNonNull(GraphQLInt)},
        books: {
            type: GraphQLList(BookType),
            resolve: ( parent, args ) =>{
                return Book.find({authorId: parent.id})
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
        name: 'RootQuery',
        description: 'Root Query',
        fields: () =>({
            book: {
                type: BookType,
                description: 'A Single Book',
                args: {
                    id: { type: GraphQLID }
                },
                resolve: ( parent, args ) => Book.findById(args.id)
            },
            author: {
                type: AuthorType,
                description: 'A Single Author',
                args: {
                    id: { type: GraphQLID }
                },
                resolve: ( parent, args ) => Author.findById(args.id)
            },
            books: {
                type: GraphQLList(BookType),
                description: 'All Books',
                resolve: ( parent, args ) => Book.find({})
            },
            authors: {
                type: GraphQLList(AuthorType),
                description: 'All Authors',
                resolve: ( parent, args ) => Author.find({})
            },
        })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'Add a book',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                genre: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                let book = new Book({ 
                    name: args.name, 
                    genre: args.genre, 
                    authorId: args.authorId
                })
                return book.save()
            }
        },
        addAuthor: {
            type: AuthorType,
            description: 'Add an Author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent, args) => {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                
                return author.save()
            }
        },
        deleteBook: {
            type: BookType,
            description: 'Delete a Single Book',
            args: {
                id: { type: GraphQLString }
            },
            resolve: ( parent, args ) => Book.findByIdAndDelete(args.id),
        },
        deleteAuthor: {
            type: AuthorType,
            description: 'Delete a Single Author',
            args: {
                id: { type: GraphQLString }
            },
            resolve: ( parent, args ) => Author.findByIdAndDelete(args.id),
        },
    })
})

const schema =  new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

module.exports = schema



//server.js



const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphQLSchema')
const mongoose = require('mongoose');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const DB = 'input database details';

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, data) => {
    if(err) return console.log('error connecting to Mongo Atlas')
    console.log(`connected to Mongo Atlas`)
});

app.listen(4000, ()=> console.log(`Server Running`))
