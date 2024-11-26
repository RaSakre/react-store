import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import storeReducer from '../slice/storeSlice'
import authReducer from '../slice/authSlice'
import ordersReducer from '../slice/ordersSlice'

export const rootReducer = combineReducers({
	webStore: storeReducer,
	auth: authReducer,
	orders:ordersReducer
})

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store