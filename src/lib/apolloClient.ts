import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3000/api/graphql", // your GraphQL endpoint
    credentials: "include", // send cookies if needed
  }),
  cache: new InMemoryCache(),
});

export default client;
