////////////////// creating the Model   //////////////////////

//# database/datamodel.graphql
`
type Grocer {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!

  email: String! @unique
}

type Customer {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!

  email: String! @unique
  basket: [BasketItem!]!
}

type BasketItem {
  id: ID! @unique
  product: Product!
  quantity: Int!
}

type Product {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!

  name: String!
  description: String!
  price: Int!
}
`



/////////////// Creating the schema  ////////////////////



//# src/schema.graphql
`
type Query {
  viewer: Viewer
  products: [Product!]!
}

type Mutation {
  addItemToBasket(productId: ID!): Viewer
  removeItemFromBasket(itemId: ID!): Viewer
  addProduct(name: String!, description: String!, price: Int!): Product!
  removeProduct(id: ID!): Product!
}

type Viewer {
  email: String!
  basket: [ProductItem!]!
}
`



///////////////// Creating rules   ////////////////////////



// src/permissions/rules.ts
import { rule, and, or, not } from 'graphql-shield'
import { Context, getUserEmail } from '../utils'

export const isGrocer = rule()(async (parent, args, ctx: Context, info) => {
  const email = getUserEmail(ctx)
  // Is there a Grocer with such email in our database (Prisma)?
  return ctx.db.exists.Grocer({ email })
})

export const isCustomer = rule()(
  async (parent, args, ctx: Context, info) => {
    const email = getUserEmail(ctx)
    // Is there a Customer with such email in our database (Prisma)?
    return ctx.db.exists.Customer({ email })
  },
)

export const isAuthenticated = or(isCustomer, isGrocer)



////////////////// Creating Permission  ///////////////////////////////



// src/permissions/index.ts

import { shield, and } from 'graphql-shield'
import * as rules from './rules'

export const permissions = shield({
  Query: {
    viewer: rules.isGrocer,
  },
  Mutation: {
    addItemToBasket: rules.isCustomer,
    removeItemFromBasket: rules.isCustomer,
    addProduct: rules.isGrocer,
    removeProduct: rules.isGrocer,
  },
  Product: {
    price: rules.isAuthenticated,
  },
})

// src/index.ts
import { permissions } from './permissions'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  middlewares: [permissions],
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: process.env.PRISMA_ENDPOINT,
      debug: false,
      secret: process.env.PRISMA_SECRET,
    }),
  }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))



////////////// with apollo server /////////////////////
