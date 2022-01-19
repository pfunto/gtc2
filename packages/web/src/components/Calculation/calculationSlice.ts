import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../Item/itemSlice';
import { PurchaseState } from '../../app/store';
import { round } from './utils';

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

export interface CalculationState {
  title: string;
  taxTip: TaxTip;
  buyerReceipts: BuyerReceipt[];
  subtotalCost: number;
  finalCost: number;
}

const initialState: CalculationState = {
  title: '',
  taxTip: { tax: 0, tip: 0 },
  buyerReceipts: [],
  subtotalCost: 0,
  finalCost: 0,
};

export const calculationSlice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {
    addTaxTip: (state, action: PayloadAction<TaxTip>) => {
      const { tax, tip } = action.payload;
      state.taxTip.tax = tax;
      state.taxTip.tip = tip;
    },
    createBuyerReceipts: (state, action: PayloadAction<PurchaseState>) => {
      const { item, buyerItem, calculation } = action.payload;
      const { tax, tip } = calculation.taxTip;

      const receipts = new Map();
      const buyersPerItem = new Map();

      for (const value of Object.values(buyerItem.byId)) {
        const { itemId } = value;
        if (!buyersPerItem.has(itemId)) {
          buyersPerItem.set(itemId, 1);
        } else {
          buyersPerItem.set(itemId, buyersPerItem.get(itemId) + 1);
        }
      }

      for (const value of Object.values(buyerItem.byId)) {
        const { buyerId, itemId } = value;
        const curItem = item.byId[parseInt(itemId)];

        // calculate buyer costs
        const { price } = curItem;
        const buyerPrice = price / buyersPerItem.get(itemId);
        const taxCost = buyerPrice * tax;
        const tipCost = buyerPrice * tip;
        const totalCost = round(buyerPrice + taxCost + tipCost);

        if (!receipts.has(buyerId)) {
          const singleBuyerReceipt: BuyerReceipt = {
            buyerId: buyerId,
            items: [curItem],
            cost: buyerPrice,
            taxCost,
            tipCost,
            totalCost,
          };
          receipts.set(buyerId, singleBuyerReceipt);
        } else {
          const updatedItems = [...receipts.get(buyerId).items, curItem];
          const updatedCost = round(receipts.get(buyerId).cost + buyerPrice);
          const updatedTaxCost = round(receipts.get(buyerId).taxCost + taxCost);
          const updatedTipCost = round(receipts.get(buyerId).tipCost + tipCost);
          const updatedTotalCost = round(
            receipts.get(buyerId).totalCost + totalCost
          );

          const updatedBuyerReceipt = {
            buyerId: buyerId,
            items: updatedItems,
            cost: updatedCost,
            taxCost: updatedTaxCost,
            tipCost: updatedTipCost,
            totalCost: updatedTotalCost,
          };
          receipts.set(buyerId, updatedBuyerReceipt);
        }
      }

      state.buyerReceipts = [...receipts.values()];

      let subtotal = 0;
      let total = 0;
      for (const value of receipts.values()) {
        const { totalCost, cost } = value;
        subtotal += cost;
        total += totalCost;
      }
      state.subtotalCost = subtotal;
      state.finalCost = total;
    },
    addTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    initializeCalculation: (state, action: PayloadAction<CalculationState>) => {
      state.taxTip = action.payload.taxTip;
      state.buyerReceipts = action.payload.buyerReceipts;
      state.subtotalCost = action.payload.subtotalCost;
      state.finalCost = action.payload.finalCost;
    },
    clearCalculation: (state) => {
      state.title = '';
      state.taxTip = { tax: 0, tip: 0 };
      state.buyerReceipts = [];
      state.subtotalCost = 0;
      state.finalCost = 0;
    },
  },
});

export const {
  addTaxTip,
  addTitle,
  createBuyerReceipts,
  initializeCalculation,
  clearCalculation,
} = calculationSlice.actions;

export default calculationSlice.reducer;
