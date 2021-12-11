import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit';
import buyerReducer, { BuyerState } from '../components/Buyer/buyerSlice';
import itemReducer, { ItemState } from '../components/Item/itemSlice';
import buyerItemReducer, {
  BuyerItemState,
} from '../components/Buyer/buyerItemSlice';
import calculationReducer, {
  CalculationState,
} from '../components/Calculation/calculationSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export interface PurchaseState {
  buyer: BuyerState;
  item: ItemState;
  buyerItem: BuyerItemState;
  calculation: CalculationState;
}

const reducers = combineReducers({
  buyer: buyerReducer,
  item: itemReducer,
  buyerItem: buyerItemReducer,
  calculation: calculationReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export function createTestStore() {
  return createStore(
    combineReducers({
      buyer: buyerReducer,
      item: itemReducer,
    })
  );
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
