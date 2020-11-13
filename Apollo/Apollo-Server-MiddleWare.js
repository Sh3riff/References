const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const { applyMiddleware } = require('graphql-middleware')

const generateId = () => Math.floor(Math.random() * 100)

const posts = [
  {
    id: generateId(),
    title: 'GraphQL Middleware',
    body: 'Something about middleware',
    category: 'Tutorial'
  }
]

const typeDefs = gql`
  type Post {
    id: ID!
    title: String
    body: String
    category: String
  }
  type Query {
    posts: [Post!]!
  }
  type Mutation {
    createPost(title: String!, body: String!, category: String!): Post
  }
`

const resolvers = {
  Query: {
    posts: () => posts
  },
  Mutation: {
    createPost: (parent, args) => ({
      id: generateId(),
      ...args
    })
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const uppercaseCategory = async (resolve, parent, args, context, info) => {
  const result = await resolve(parent, args, context, info)

  return result.toUpperCase()
}

const postsMiddleware = async (resolve, parent, args, context, info) => {
  const result = await resolve(parent, args, context, info)

  const formattedPosts = result.reduce(
    (formatted, post) => [
      ...formatted,
      {
        ...post,
        title: `${post.category}: ${post.title}`
      }
    ],
    []
  )

  return formattedPosts
}

const postMiddleware = {
  Post: {
    category: uppercaseCategory
  },
  Query: {
    posts: postsMiddleware
  }
}

const middleware = [postMiddleware]

const schemaWithMiddleware = applyMiddleware(schema, ...middleware)

const server = new ApolloServer({ schema: schemaWithMiddleware })

////////// for my use case   //////////

schema: applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers }),
    ...permissions
)

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
