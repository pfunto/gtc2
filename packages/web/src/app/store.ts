import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import purchaserSlice from '../components/PurchaserMenu/purchaserSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    purchaser: purchaserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
