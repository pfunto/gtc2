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

export interface PurchaserItemState {
  byId: { [key: string]: PurchaserItem };
  allIds: string[];
}
const initialState: PurchaserItemState = {
  byId: {},
  allIds: [],
};

export const purchaserItemSlice = createSlice({
  name: 'purchaserItem',
  initialState,
  reducers: {
    joinPurchaserItem: (state, action: PayloadAction<PurchaseItemId>) => {
      const { purchaserId, itemId } = action.payload;
      const purchaserItemId = purchaserId + '.' + itemId;
      state.byId[purchaserItemId] = {
        ...action.payload,
        id: purchaserItemId,
      };
      state.allIds.push(purchaserItemId);
    },
    removePurchaserItem: (state, action: PayloadAction<PurchaseItemId>) => {
      const { purchaserId, itemId } = action.payload;
      const purchaserItemId = purchaserId + '.' + itemId;
      delete state.byId[purchaserItemId];
      state.allIds = state.allIds.filter((id) => id !== purchaserItemId);
    },
    initializePurchaserItem: (
      state,
      action: PayloadAction<PurchaserItemState>
    ) => {   
      console.log(state)
      state.byId = action.payload.byId;
      state.allIds = action.payload.allIds;
    },
  },
});

export const {
  joinPurchaserItem,
  removePurchaserItem,
  initializePurchaserItem,
} = purchaserItemSlice.actions;

export default purchaserItemSlice.reducer;
