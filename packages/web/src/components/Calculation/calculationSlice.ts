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
  taxCost: number;
  tipCost: number;
  totalCost: number;
}

interface BuyerReceiptState {
  taxTip: TaxTip;
  purchaseState: PurchaseState;
}

export interface CalculationState {
  taxTip: TaxTip;
  buyerReceipts: BuyerReceipt[];
  finalCost: number;
}

const initialState: CalculationState = {
  taxTip: { tax: 0, tip: 0 },
  buyerReceipts: [],
  finalCost: 0,
};

export const calculationSlice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {
    createBuyerReceipts: (state, action: PayloadAction<BuyerReceiptState>) => {
      const { item, buyerItem } = action.payload.purchaseState;
      const { tax, tip } = action.payload.taxTip;

      const map = new Map();

      function round(num: number) {
        const m = Number((Math.abs(num) * 100).toPrecision(15));
        return (Math.round(m) / 100) * Math.sign(num);
      }

      for (const value of Object.values(buyerItem.byId)) {
        const { buyerId, itemId } = value;
        const curItem = item.byId[parseInt(itemId)];
        const { price } = curItem;
        const taxCost = price * tax;
        const tipCost = price * tip;
        const totalCost = round(price + taxCost + tipCost);

        if (!map.has(buyerId)) {
          const singleBuyerReceipt = {
            buyerId: buyerId,
            items: [curItem],
            cost: price,
            taxCost,
            tipCost,
            totalCost,
          };
          map.set(buyerId, singleBuyerReceipt);
        } else {
          const updatedItems = [...map.get(buyerId).items, curItem];
          const updatedCost = round(map.get(buyerId).cost + price);
          const updatedTaxCost = round(map.get(buyerId).taxCost + taxCost);
          const updatedTipCost = round(map.get(buyerId).tipCost + tipCost);
          const updatedTotalCost = round(
            map.get(buyerId).totalCost + totalCost
          );

          const updatedBuyerReceipt = {
            buyerId: buyerId,
            items: updatedItems,
            cost: updatedCost,
            taxCost: updatedTaxCost,
            tipCost: updatedTipCost,
            totalCost: updatedTotalCost,
          };
          map.set(buyerId, updatedBuyerReceipt);
        }
      }

      state.buyerReceipts = [...map.values()];

      let total = 0;
      for (const value of map.values()) {
        const { totalCost } = value;
        total += totalCost;
      }
      state.finalCost = total;
    },
  },
});

export const { createBuyerReceipts } = calculationSlice.actions;

export default calculationSlice.reducer;
