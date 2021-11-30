import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit';
import purchaserReducer, {
  PurchaserState,
} from '../components/Purchaser/purchaserSlice';
import itemReducer, { ItemState } from '../components/Item/itemSlice';
import purchaserItemReducer, {
  PurchaserItemState,
} from '../components/Purchaser/purchaserItemSlice';

export interface PurchaseState {
  purchaser: PurchaserState;
  item: ItemState;
  purchaserItem: PurchaserItemState;
}

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
