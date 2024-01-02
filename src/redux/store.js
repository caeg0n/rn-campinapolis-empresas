import AsyncStorage from '@react-native-async-storage/async-storage';
import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from '@src/redux/reducers/session';
import userReducer from '@src/redux/reducers/user';
import { persistStore, persistReducer } from 'redux-persist';

const rootReducer = combineReducers({ userReducer, sessionReducer });

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const Store = createStore(rootReducer, applyMiddleware(thunk));
export const Store = legacy_createStore(
  persistedReducer,
  applyMiddleware(thunk),
);
export const persistor = persistStore(Store);
