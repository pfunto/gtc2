import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit';
import purchaserReducer from '../components/PurchaserMenu/purchaserSlice';

export const store = configureStore({
  reducer: {
    purchaser: purchaserReducer,
  },
});

export function createTestStore() {
  return createStore(
    combineReducers({
      purchaser: purchaserReducer,
    })
  );
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
