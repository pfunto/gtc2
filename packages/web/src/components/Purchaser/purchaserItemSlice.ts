// Slice for creating join table between Items and Purchasers
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PurchaserItem {
  id: string;
  purchaserId: string;
  itemId: string;
}

interface PurchaseItemId {
  purchaserId: string;
  itemId: string;
}

interface PurchaserItemState {
  counter: number;
  byId: { [key: number]: PurchaserItem };
  allIds: number[];
}
const initialState: PurchaserItemState = {
  counter: 0,
  byId: {},
  allIds: [],
};

export const purchaserItemSlice = createSlice({
  name: 'purchaserItem',
  initialState,
  reducers: {
    joinPurchaserItem: (state, action: PayloadAction<PurchaseItemId>) => {
      state.byId[state.counter] = {
        ...action.payload,
        id: state.counter.toString(),
      };
      state.counter += 1;
    },
  },
});

export const { joinPurchaserItem } = purchaserItemSlice.actions;

export default purchaserItemSlice.reducer;
