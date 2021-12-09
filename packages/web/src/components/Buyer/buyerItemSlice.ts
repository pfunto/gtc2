// Slice for creating join table between Items and Buyers
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BuyerItem {
  id: string;
  buyerId: string;
  itemId: string;
}

interface PurchaseItemId {
  buyerId: string;
  itemId: string;
}

interface BuyerItemIds {
  buyerIds: string[];
  itemIds: string[];
}

export interface BuyerItemState {
  byId: { [key: string]: BuyerItem };
  allIds: string[];
}
const initialState: BuyerItemState = {
  byId: {},
  allIds: [],
};

export const buyerItemSlice = createSlice({
  name: 'buyerItem',
  initialState,
  reducers: {
    joinBuyerItem: (state, action: PayloadAction<PurchaseItemId>) => {
      const { buyerId, itemId } = action.payload;
      const buyerItemId = buyerId + '.' + itemId;
      state.byId[buyerItemId] = {
        ...action.payload,
        id: buyerItemId,
      };
      state.allIds.push(buyerItemId);
    },
    removeBuyerItem: (state, action: PayloadAction<PurchaseItemId>) => {
      const { buyerId, itemId } = action.payload;
      const buyerItemId = buyerId + '.' + itemId;
      delete state.byId[buyerItemId];
      state.allIds = state.allIds.filter((id) => id !== buyerItemId);
    },
    joinAllBuyerItem: (state, action: PayloadAction<BuyerItemIds>) => {},
    removeAllBuyerItem: (state) => {
      state.byId = {};
      state.allIds = [];
    },
    initializeBuyerItem: (state, action: PayloadAction<BuyerItemState>) => {
      console.log(state);
      state.byId = action.payload.byId;
      state.allIds = action.payload.allIds;
    },
  },
});

export const { joinBuyerItem, removeBuyerItem, initializeBuyerItem } =
  buyerItemSlice.actions;

export default buyerItemSlice.reducer;
