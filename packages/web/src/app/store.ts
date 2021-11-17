import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit';
import purchaserReducer from '../components/Purchaser/purchaserSlice';
import itemReducer from '../components/Item/itemSlice';
import purchaserItemReducer from '../components/Purchaser/purchaserItemSlice';

export const store = configureStore({
  reducer: {
    purchaser: purchaserReducer,
    item: itemReducer,
    purchaserItem: purchaserItemReducer,
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
