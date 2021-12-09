import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../Item/itemSlice';
import { PurchaseState } from '../../app/store';

interface TaxTip {
  tax: number;
  tip: number;
}

interface BuyerReceipt {
  buyerId: string;
  items: Item[];
  cost: number;
}

export interface CalculationState {
  taxTip: TaxTip;
  buyerReceipts: BuyerReceipt[];
  totalCost: number;
}

const initialState: CalculationState = {
  taxTip: { tax: 0, tip: 0 },
  buyerReceipts: [],
  totalCost: 0,
};

export const calculationSlice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {
    addTaxTip: (state, action: PayloadAction<TaxTip>) => {
      state.taxTip.tax = action.payload.tax / 100;
      state.taxTip.tip = action.payload.tip / 100;
    },
    createBuyerReceipts: (state, action: PayloadAction<PurchaseState>) => {
      const { item, buyerItem } = action.payload;
      const map = new Map();

      function round(num: number) {
        const m = Number((Math.abs(num) * 100).toPrecision(15));
        return (Math.round(m) / 100) * Math.sign(num);
      }

      for (const value of Object.values(buyerItem.byId)) {
        const { buyerId, itemId } = value;
        const curItem = item.byId[parseInt(itemId)];
        const { price } = curItem;
        const tax = price * state.taxTip.tax;
        const tip = price * state.taxTip.tip;
        const cost = round(price + tax + tip);
        console.log(cost);

        if (!map.has(buyerId)) {
          const singleBuyerReceipt = {
            buyerId: buyerId,
            items: [curItem],
            cost: cost,
          };
          map.set(buyerId, singleBuyerReceipt);
        } else {
          const updatedItems = [...map.get(buyerId).items, curItem];
          const updatedCost = map.get(buyerId).cost + cost;

          const updatedBuyerReceipt = {
            buyerId: buyerId,
            items: updatedItems,
            cost: updatedCost,
          };
          map.set(buyerId, updatedBuyerReceipt);
        }
      }

      state.buyerReceipts = [...map.values()];
    },
    calculate: (state, action: PayloadAction<CalculationState>) => {
      const { buyerReceipts } = action.payload;
      for (const value of buyerReceipts) {
        console.log(value);
      }
    },
  },
});

export const { addTaxTip, createBuyerReceipts, calculate } =
  calculationSlice.actions;

export default calculationSlice.reducer;
