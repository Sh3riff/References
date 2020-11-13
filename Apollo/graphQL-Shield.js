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

