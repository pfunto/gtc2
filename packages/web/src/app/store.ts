import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit';
import purchaserReducer, {
  PurchaserState,
} from '../components/Purchaser/purchaserSlice';
import itemReducer, { ItemState } from '../components/Item/itemSlice';
import purchaserItemReducer, {
  PurchaserItemState,
} from '../components/Purchaser/purchaserItemSlice';
import calculationReducer from '../components/Calculation/calculationSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export interface PurchaseState {
  purchaser: PurchaserState;
  item: ItemState;
  purchaserItem: PurchaserItemState;
}

const reducers = combineReducers({
  purchaser: purchaserReducer,
  item: itemReducer,
  purchaserItem: purchaserItemReducer,
  calculation: calculationReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
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
