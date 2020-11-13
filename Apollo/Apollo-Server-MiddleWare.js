const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const { applyMiddleware } = require('graphql-middleware')



const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})


const middleware = [middlewareOne, middlewareTwo, middlewareThree]

const schemaWithMiddleware = applyMiddleware(schema, ...middleware)

const server = new ApolloServer({ schema: schemaWithMiddleware })

////////// for my use case   //////////

schema: applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers }),
    ...permissions // middleware
)

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
