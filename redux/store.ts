import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { graphqlApi } from "./services/graphql";

const store = configureStore({
  reducer: {
    [graphqlApi.reducerPath]: graphqlApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(graphqlApi.middleware)
});

setupListeners(store.dispatch);

export default store;
