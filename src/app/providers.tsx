"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { ApolloProvider } from "@apollo/client/react";
import client from "@/lib/apolloClient";


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </Provider>
  );
}
