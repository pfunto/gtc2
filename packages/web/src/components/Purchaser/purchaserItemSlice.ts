import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface purchaserItem {
  id: string;
  purchaserId: string;
  itemId: string;
}

interface purchaserItemState {
  counter: number;
  byId: { [key: number]: purchaserItem };
  allIds: number[];
}
const initialState: purchaserItemState = {
  counter: 0,
  byId: {},
  allIds: [],
};

export const purchaserItemSlice = createSlice({
  name: 'purchaserItem',
  initialState,
  reducers: {},
});

export default purchaserItemSlice.reducer;
