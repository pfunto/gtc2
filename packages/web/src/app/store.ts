import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit';
import purchaserReducer from '../components/PurchaserMenu/purchaserSlice';
import itemReducer from '../components/ItemMenu/itemSlice';

export const store = configureStore({
  reducer: {
    purchaser: purchaserReducer,
    item: itemReducer,
  },
});

export function createTestStore() {
  return createStore(
    combineReducers({
      purchaser: purchaserReducer,
      item: itemReducer,
    })
  );
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
