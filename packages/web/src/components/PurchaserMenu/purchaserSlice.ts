import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface Purchaser {
  id: string;
  name: string;
}

interface PurchaserState {
  counter: number;
  byId: { [key: number]: Purchaser };
  allIds: number[];
}
const initialState: PurchaserState = {
  counter: 0,
  byId: {},
  allIds: [],
};

export const purchaserSlice = createSlice({
  name: 'purchaser',
  initialState,
  reducers: {
    addPurchaser: (state, action: PayloadAction<Purchaser>) => {
      state.byId[state.counter] = action.payload;
      state.allIds.push(state.counter);
      state.counter += 1;
    },
    editPurchaser: (state, action: PayloadAction<Purchaser>) => {
      state.byId[parseInt(action.payload.id)] = action.payload;
    },
  },
});

export const { addPurchaser, editPurchaser } = purchaserSlice.actions;

export default purchaserSlice.reducer;

/*
Models:
User
Purchase -> {purchasers, items, stats}


invite: has its own flow

addPurchaser -> look up existing users vs no account 

everyone has to join the room... confirmation


{
  [id]: {
    id: id,
    name: 'eric',
    userId: null,
  }
  },
}
items:
{

}
purchaseritems
{
  1: {
    purchaserId: 1,
    itemId: 1
  }
}

[{}, {}. ]

array.filter((id) => id === item.id) On
purchaser['57']


Objects.keys().map((id) => {
  byId[id]
})


*/
