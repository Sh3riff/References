import { ApolloClient, InMemoryCache, createHttpLink, HttpLink, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

//Basic

const client = new ApolloClient({
  uri: 'https://api.example.com',
  cache: new InMemoryCache(),
  name: "web-client",
  version: "1.0.0",
  // Enable sending cookies over cross-origin requests
  credentials: 'include', //include user credentials (basic auth, cookies, etc.) other options same-origin & omit
  // Customizing request headers
  headers: {
    authorization: localStorage.getItem('token'),
    // 'client-name': 'WidgetX Ecom [web]',
    // 'client-version': '1.0.0'
  }
});

// Advannce

const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri: 'https://api.example.com' }); //or
const httpLink = new HttpLink({ uri: "https://api.example.com" });  // using this

const ErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});


const client = new ApolloClient({
  link: from([ErrorLink, httpLink]),
  cache: new InMemoryCache(),
  name: "web-client",
  version: "1.0.0",
  // Enable sending cookies over cross-origin requests
  credentials: 'include', //include user credentials (basic auth, cookies, etc.) other options same-origin & omit
  // Customizing request headers
  headers: {
    authorization: localStorage.getItem('token'),
    // 'client-name': 'WidgetX Ecom [web]',
    // 'client-version': '1.0.0'
  }
});





////////////////////// Advanced HTTP networking ////////////////////

                ///// - Customizing request logic//////


/*
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';
const httpLink = new HttpLink({ uri: '/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null,
    }
  });

  return forward(operation);
})

const client2 = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});





import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, from } from '@apollo/client';

const httpLink = new HttpLink({ uri: '/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || null,
    }
  }));

  return forward(operation);
})

const activityMiddleware = new ApolloLink((operation, forward) => {
  // add the recent-activity custom header to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'recent-activity': localStorage.getItem('lastOnlineTime') || null,
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    authMiddleware,
    activityMiddleware,
    httpLink
  ]),
}); */




                ///// - Customizing response logic//////

/*import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { logout } from './logout';

const httpLink = new HttpLink({ uri: '/graphql' });

const logoutLink = onError(({ networkError }) => {
    if (networkError.statusCode === 401) logout();
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: logoutLink.concat(httpLink),
});*/



////////////////////// Reset store on logout ////////////////////

//    -client.resetStore()
//    -client.clearStore()


/*function Profile() {
  const { client, loading, data: { currentUser } } = useQuery();

  if (loading) {
    return <p className="navbar-text navbar-right">Loading...</p>;
  }

  if (currentUser) {
    return (
      <span>
        <p className="navbar-text navbar-right">
          {currentUser.login}
          &nbsp;
          <button
            onClick={() => {
              // call your auth logout code then reset store
              App.logout().then(() => client.resetStore());
            }}
          >
            Log out
          </button>
        </p>
      </span>
    );
  }

  return (
    <p className="navbar-text navbar-right">
      <a href="/login/github">Log in with GitHub</a>
    </p>
  );
}*/


////////////////////// ApolloConsumer ////////////////////

/*import React from 'react';
import { ApolloConsumer } from '@apollo/client';

const WithApolloClient = () => (
  <ApolloConsumer>
    {client => 'We have access to the client!'  do stuff here }
  </ApolloConsumer>
);*/




////////////////////// Error Link ////////////////////



/*import { onError } from "@apollo/client/link/error";

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});*/

///////////

/*onError(({ response, operation }) => {
  if (operation.operationName === "IgnoreErrorsQuery") {
    response.errors = null;
  }
});*/



////////////////////// Rest Link ////////////////////







////////////////////// Retry Link ////////////////////

/*import { RetryLink } from "@apollo/client/link/retry";

const link = new RetryLink();

//Default configuration
new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true
    },
    attempts: {
      max: 5,
      retryIf: (error, _operation) => !!error
    }
  });

//Custom strategies
import { RetryLink } from "@apollo/client/link/retry";

const link = new RetryLink({
  attempts: (count, operation, error) => {
    return !!error && operation.operationName != 'specialCase';
  },
  delay: (count, operation, error) => {
    return count * 1000 * Math.random();
  },
});*/
