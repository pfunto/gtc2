import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Buyer {
  id: string;
  name: string;
}

export interface BuyerId {
  buyerId: string;
}

export interface BuyerState {
  counter: number;
  byId: { [key: number]: Buyer };
  allIds: number[];
}
const initialState: BuyerState = {
  counter: 0,
  byId: {},
  allIds: [],
};

export const buyerSlice = createSlice({
  name: 'buyer',
  initialState,
  reducers: {
    addBuyer: (state, action: PayloadAction<Buyer>) => {
      state.byId[state.counter] = action.payload;
      state.allIds.push(state.counter);
      state.counter += 1;
    },
    editBuyer: (state, action: PayloadAction<Buyer>) => {
      state.byId[parseInt(action.payload.id)] = action.payload;
    },
    removeBuyer: (state, action: PayloadAction<BuyerId>) => {
      const removeId = parseInt(action.payload.buyerId);
      delete state.byId[removeId];
      state.allIds = state.allIds.filter((id) => id !== removeId);
    },
    initializeBuyers: (state, action: PayloadAction<BuyerState>) => {
      state.counter = action.payload.counter;
      state.byId = action.payload.byId;
      state.allIds = action.payload.allIds;
    },
  },
});

export const { addBuyer, editBuyer, removeBuyer, initializeBuyers } =
  buyerSlice.actions;

export default buyerSlice.reducer;

/*
Models:
User
Purchase -> {buyers, items, stats}


invite: has its own flow

addBuyer -> look up existing users vs no account 

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
buyeritems
{
  1: {
    buyerId: 1,
    itemId: 1
  }
}

[{}, {}. ]

array.filter((id) => id === item.id) On
buyer['57']


Objects.keys().map((id) => {
  byId[id]
})


*/
