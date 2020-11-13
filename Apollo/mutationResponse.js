interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    // update: String
    // maintenance: String
    // authToken: String
}

  
type UpdateUserEmailMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
}
  
  {
    "data": {
      "updateUser": {
        "code": "200",
        "success": true,
        "message": "User email was successfully updated",
        "user": {
          "id": "1",
          "name": "Jane Doe",
          "email": "jane@example.com"
        }
      }
    }
  }


//////////////////////////////////////////////

const typedef = `
type User {
  id: ID!
  login: String!
}

type UserNotFoundError {
  message: String!
}

union UserResult = User | UserNotFoundError

type Query {
  user(id: ID!): UserResult!
}
`
// query user($id: ID!) {
//   user(id: $id) {
//     ... on UserNotFoundError {
//       message
//     }
//     ... on User {
//       id
//       login
//     }
//   }
// }

// const resolvers = {
//   Query: {
//     user: async (parent, args, context) => {
//       const userRecord = await context.db.findUserById(args.id);
//       if (userRecord) {
//         return {
//           __typename: "User",
//           ...userRecord,
//         };
//       }
//       return {
//         __typename: "UserNotFound",
//         message: `The user with the id ${args.id} does not exist.`,
//       };
//     },
//   },
// };
