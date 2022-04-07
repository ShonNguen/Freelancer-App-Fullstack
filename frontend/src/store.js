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
import jobReducer from './slices/jobsSlice'; 
import projectReducer from './slices/projectsSlice'; 


const persistConfig = {
    key: 'root-shon',
    version: 1,
    storage
};

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
  projects: projectReducer,
  message: messageReducer
});

//store the storage on local storage
const persistedReducer = persistReducer(persistConfig, rootReducer);

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