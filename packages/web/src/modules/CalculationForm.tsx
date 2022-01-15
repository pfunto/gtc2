import 'twin.macro';
import 'styled-components/macro';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PurchaseState } from '../app/store';
import AddBuyer from '../components/Buyer/AddBuyer';
import AddTaxTip from '../components/Calculation/AddTaxTip';
import { createBuyerReceipts } from '../components/Calculation/calculationSlice';
import AddItem from '../components/Item/AddItem';
import { createPurchase, getUserPurchase } from '../services/PurchaseService';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { initializeBuyerItem } from '../components/Buyer/buyerItemSlice';
import { initializeBuyers } from '../components/Buyer/buyerSlice';
import { initializeItems } from '../components/Item/itemSlice';
import InfoBar from '../components/ui/InfoBar';

const CalculationForm = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user.id);
  let { purchaseId } = useParams();
  const purchaseState: PurchaseState = useAppSelector((state) => ({
    buyer: state.buyer,
    item: state.item,
    buyerItem: state.buyerItem,
    calculation: state.calculation,
  }));

  useEffect(() => {
    if (purchaseId) {
      getUserPurchase(purchaseId)
        .then((response) => {
          dispatch(initializeBuyers(response.state.buyer));
          dispatch(initializeItems(response.state.item));
          dispatch(initializeBuyerItem(response.state.buyerItem));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, purchaseId]);

  return (
    <>
      <label>Title here</label>
      <input
        id="title_input"
        type="text"
        tw="mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-8 sm:text-sm border-gray-500 border"
      />
      <AddBuyer />
      <AddItem />
      <AddTaxTip />
      <button
        onClick={() => {
          dispatch(createBuyerReceipts(purchaseState));
          if (userId)
            createPurchase({
              state: purchaseState,
              userId,
              title: document.getElementsByTagName('input')[0].value,
            });
        }}
      >
        Calc
      </button>

      <InfoBar />
    </>
  );
};

export default CalculationForm;
