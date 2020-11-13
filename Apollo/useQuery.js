import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { useQuery, useLazyQuery, gql, NetworkStatus } from '@apollo/client';

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

const GET_DOG_PHOTO = gql`
  query dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

export const Dogs = ({ onDogSelected }) => {
  
    const { loading, error, data } = useQuery(GET_DOGS);
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
    return (
      <div>
        <select name="dog" onChange={onDogSelected}>
          {data.dogs.map(dog => (
            <option key={dog.id} value={dog.breed}>
              {dog.breed}
            </option>
          ))}
        </select>
      </div>
    );
}

export const DogPhoto = ({ breed }) => {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_DOG_PHOTO,
    {
      variables: { breed },
      notifyOnNetworkStatusChange: true,
      // fetchPolicy: "cache-first" is the default. others cache-only, cache-and-network, network-only e.t.c
      // errorPolicy: "all" // default value "none" nothing much in the docs
      // pollInterval: 2500  // requery interval in milliseconds
      //N.B: refetch above is a function dt requery/refreshes when invoked. it can optionally take variables object or use the default
    }
  );

  if (networkStatus === NetworkStatus.refetch) return <p>Refetching!</p>;
  // or if (networkStatus === 4) return <p>Refetching!</p>;
  // networkStatus uses enum values 1 to 8 which are present in NetworkStatus
      //NetworkStatus.loading = 1
      //NetworkStatus.setVariables = 2
      //NetworkStatus.fetchMore = 3
      //NetworkStatus.refresh = 4
      //No 5
      //NetworkStatus.poll = 6
      //NetworkStatus.ready = 7
      //NetworkStatus.error = 8
  if (loading) return null;
  if (error) return `Error!: ${error}`;

  return (
    <div>
      <div>
        <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} alt=""/>
      </div>
      <button onClick={() => refetch()}>Refetch!</button>
    </div>
  );
}





// manually executing queries 
export function DelayedQuery() {
  const [getDog, { loading, data }] = useLazyQuery(GET_DOG_PHOTO);

  if (loading) return <p>Loading ...</p>;

  return (
    <div>
      <h1>useLazyQuery</h1>
      {data && <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} alt=""/>}
      <button onClick={() => getDog({ variables: { breed: 'bulldog' } }) }>
        Click me!
      </button>
    </div>
  );
}

//useQuery/useLazyQuery/Query returns result object with the follow
    // {data, loading, error, networkStatus, variables, refetch, fetchMore, 
    //  startPolling, stopPolling, subscribeToMore, updateQuery, client, called}


const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache()
});

    function App() {
      const [selectedDog, setSelectedDog] = React.useState(null);
    
      function onDogSelected({ target }) {
        setSelectedDog(target.value);
      }
      return (
        <ApolloProvider client={client}>
          <div>
            <h1>My first Apollo app </h1>
          </div>
          {selectedDog && <DogPhoto breed={selectedDog} />}
          <Dogs onDogSelected={onDogSelected}/>
          <DelayedQuery />
        </ApolloProvider>
      );
    }
