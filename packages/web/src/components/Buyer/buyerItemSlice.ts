// Slice for creating join table between Items and Buyers
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemId } from '../Item/itemSlice';
import { BuyerId } from './buyerSlice';

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
    unjoinItems: (state, action: PayloadAction<BuyerId>) => {
      for (const value of Object.values(state.byId)) {
        const { id, buyerId } = value;
        if (buyerId === action.payload.buyerId) {
          state.allIds = state.allIds.filter((itemId) => itemId !== id);
          delete state.byId[id];
        }
      }
    },
    unjoinBuyers: (state, action: PayloadAction<ItemId>) => {
      for (const value of Object.values(state.byId)) {
        const { id, itemId } = value;
        if (itemId === action.payload.itemId) {
          state.allIds = state.allIds.filter((buyerId) => buyerId !== id);
          delete state.byId[id];
        }
      }
    },
    joinAllBuyerItem: (state, action: PayloadAction<BuyerItemIds>) => {},
    removeAllBuyerItem: (state) => {
      state.byId = {};
      state.allIds = [];
    },
    initializeBuyerItem: (state, action: PayloadAction<BuyerItemState>) => {
      state.byId = action.payload.byId;
      state.allIds = action.payload.allIds;
    },
  },
});

export const {
  joinBuyerItem,
  removeBuyerItem,
  unjoinItems,
  unjoinBuyers,
  initializeBuyerItem,
} = buyerItemSlice.actions;

export default buyerItemSlice.reducer;
