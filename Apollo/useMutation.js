import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://sxewr.sse.codesandbox.io/",
  cache: new InMemoryCache()
});

/* const [mutateFunction, { data, loading, error, called, client }] = useMutation(
    mutation(queryString),
    variables,
    update,
    ignoreResults,
    optimisticResponse,
    refreshQueries,
    awaitRefreshQueries,
    onComplete,
    onError,
    context,
    cliient
    );*/


const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

function AddTodo() {
  let input;
  const [addTodo, { data }] = useMutation(ADD_TODO);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;

function Todos() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [updateTodo] = useMutation(UPDATE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.todos.map(({ id, type }) => {
    let input;

    return (
      <div key={id}>
        <p>{type}</p>
        <form
          onSubmit={e => {
            e.preventDefault();
            updateTodo({ variables: { id, type: input.value } });
            input.value = '';
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Update Todo</button>
        </form>
      </div>
    );
  });
}



export default () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Building Mutation components </h2>
        <AddTodo />
        <Todos />
      </div>
    </ApolloProvider>
  );
}
