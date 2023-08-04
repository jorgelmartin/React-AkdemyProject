
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from '../containers/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
    key: root,
    storage
}

const reducers = combineReducers({
    user: userSlice,
})

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);