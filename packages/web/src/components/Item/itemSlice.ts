import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Item {
  id: string;
  name: string;
  price: number;
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
    editItem: (state, action: PayloadAction<Item>) => {
      state.byId[parseInt(action.payload.id)] = action.payload;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const removeId = parseInt(action.payload);
      delete state.byId[removeId];
      state.allIds = state.allIds.filter((id) => id !== removeId);
    },
    initializeItems: (state, action: PayloadAction<ItemState>) => {
      state.counter = action.payload.counter;
      state.byId = action.payload.byId;
      state.allIds = action.payload.allIds;
    },
  },
});

export const { addItem, editItem, removeItem, initializeItems } =
  itemSlice.actions;

export default itemSlice.reducer;
