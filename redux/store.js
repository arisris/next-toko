import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { helloApi } from "./services/hello";

const store = configureStore({
  reducer: {
    [helloApi.reducerPath]: helloApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(helloApi.middleware)
});

setupListeners(store.dispatch);

export default store;