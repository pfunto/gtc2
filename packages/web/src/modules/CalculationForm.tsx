import 'twin.macro';
import 'styled-components/macro';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PurchaseState } from '../app/store';
import AddBuyer from '../components/Buyer/AddBuyer';
import AddTaxTip from '../components/Calculation/AddTaxTip';
import {
  createBuyerReceipts,
  initializeCalculation,
} from '../components/Calculation/calculationSlice';
import AddItem from '../components/Item/AddItem';
import { createPurchase, getUserPurchase } from '../services/PurchaseService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { initializeBuyerItem } from '../components/Buyer/buyerItemSlice';
import { initializeBuyers } from '../components/Buyer/buyerSlice';
import { initializeItems } from '../components/Item/itemSlice';
import InfoBar from '../components/ui/InfoBar';

const CalculationForm = () => {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
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
      setIsLoaded(false);
      getUserPurchase(purchaseId)
        .then((response) => {
          setTitle(response.title);
          dispatch(initializeBuyers(response.state.buyer));
          dispatch(initializeItems(response.state.item));
          dispatch(initializeBuyerItem(response.state.buyerItem));
          dispatch(initializeCalculation(response.state.calculation));
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, purchaseId]);

  useEffect(() => {
    if (isLoaded) dispatch(createBuyerReceipts(purchaseState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    isLoaded,
    purchaseState.buyer.byId,
    purchaseState.item.byId,
    purchaseState.buyerItem.byId,
    purchaseState.calculation.taxTip,
  ]);

  return (
    <>
      <div tw="flex flex-col items-center">
        <label>Title here</label>
        <input
          id="title_input"
          type="text"
          tw="mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-8 sm:text-sm border-gray-500 border"
          placeholder={title}
        />
        <AddBuyer />
        <AddItem />
        <AddTaxTip />
        <button
          tw="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ml-1"
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
          Calculate
        </button>

        <InfoBar />
      </div>
    </>
  );
};

export default CalculationForm;
