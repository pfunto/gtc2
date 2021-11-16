import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Item {
  id: string;
  name: string;
  price: string;
}

export interface ItemState {
  counter: number;
  byId: { [key: number]: Item };
  allIds: number[];
}
const initialState: ItemState = {
  counter: 0,
  byId: {},
  allIds: [],
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.byId[state.counter] = action.payload;
      state.allIds.push(state.counter);
      state.counter += 1;
    },
  },
});

export const { addItem } = itemSlice.actions;

export default itemSlice.reducer;
