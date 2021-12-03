import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalculationState {
  tax: number;
  tip: number;
}

const initialState: CalculationState = {
  tax: 0,
  tip: 0,
};

export const calculationSlice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {
    addTaxTip: (state, action: PayloadAction<CalculationState>) => {
      state.tax = action.payload.tax;
      state.tip = action.payload.tip;
    },
  },
});

export const { addTaxTip } = calculationSlice.actions;

export default calculationSlice.reducer;
