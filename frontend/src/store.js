import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer, PURGE,
  REGISTER, REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import messageReducer from "./slices/message";
import authReducer from "./slices/userAuth";


const persistConfig = {
    key: 'root-shon',
    version: 1,
    storage
};

// const reducer = {
//   auth: authReducer,
//   message: messageReducer
// }

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = configureStore({
//   reducer: persistedReducer,
//   devTools: true,
// })

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    devTools: true,
})
export default store;