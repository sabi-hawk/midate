import {
    configureStore,
  } from "@reduxjs/toolkit";
  import rootReducer from "../reducers";
  import thunk from "redux-thunk";
  import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  
  const persistConfig = {
    key: "root-dating",
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = configureStore({
    reducer: persistedReducer, // rootReducer
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(thunk),
    devTools: true,
  });
  
  export default store;
  export const persister = persistStore(store);
  export type AppState = ReturnType<typeof store.getState>;
  