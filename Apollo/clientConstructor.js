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
