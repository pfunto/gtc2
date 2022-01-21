import tw from 'twin.macro';
import 'styled-components/macro';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PurchaseState } from '../app/store';
import AddBuyer from '../components/Buyer/AddBuyer';
import AddTaxTip from '../components/Calculation/AddTaxTip';
import {
  addTitle,
  createBuyerReceipts,
  initializeCalculation,
} from '../components/Calculation/calculationSlice';
import AddItem from '../components/Item/AddItem';
import {
  createPurchase,
  deletePurchase,
  getUserPurchase,
  updatePurchase,
} from '../services/PurchaseService';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { initializeBuyerItem } from '../components/Buyer/buyerItemSlice';
import { initializeBuyers } from '../components/Buyer/buyerSlice';
import { initializeItems } from '../components/Item/itemSlice';
import InfoBar from '../components/ui/InfoBar';
import { TrashIcon } from '@heroicons/react/solid';

const CalculationForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { purchaseId } = useParams();

  const [isLoaded, setIsLoaded] = useState<boolean>(!purchaseId);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const userId = useAppSelector((state) => state.auth.user.id);

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
          dispatch(addTitle(response.state.calculation.title));
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
  }, [dispatch, isLoaded, purchaseState.calculation.taxTip]);

  const handleSubmit = () => {
    dispatch(createBuyerReceipts(purchaseState));
    if (purchaseId) {
      updatePurchase(purchaseId, {
        state: purchaseState,
        title: purchaseState.calculation.title,
      });
    } else {
      createPurchase({
        state: purchaseState,
        userId,
        title: purchaseState.calculation.title,
      });
      navigate('/');
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    dispatch(addTitle(e.currentTarget.value));
  };

  const deleteStyles = {
    active: tw`inline-flex items-center mx-2 px-3 py-2 border border-transparent text-base font-medium rounded-md text-gray-800 bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700`,
    inactive: tw`inline-flex items-center mx-2 px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 ml-1`,
  };

  return (
    <>
      <div tw="flex flex-col items-center w-3/5 mx-auto overflow-y-scroll">
        <div tw="flex relative items-stretch focus-within:z-10 w-full mt-12">
          <label tw="absolute -top-6 block text-sm font-medium text-gray-700">
            Purchase Name
          </label>
          <input
            id="title_input"
            type="text"
            tw="mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-8 sm:text-sm border-gray-500 border"
            onChange={handleChange}
            value={purchaseState.calculation.title}
            placeholder="Name this purchase (for your records)"
          />
        </div>

        <AddBuyer />

        <AddItem />

        <AddTaxTip isLoaded={isLoaded} />

        <InfoBar />

        <div tw="flex justify-end w-full my-12">
          <button
            onClick={handleSubmit}
            tw="inline-flex items-center mx-2 px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ml-1"
          >
            {purchaseId ? 'Save Purchase' : 'Create Purchase'}
          </button>

          {purchaseId && (
            <button
              type="button"
              onClick={() => {
                if (!isDelete) setIsDelete(true);
                if (purchaseId && isDelete) {
                  deletePurchase(purchaseId);
                  navigate('/');
                }
              }}
              onBlur={() => {
                setIsDelete(false);
              }}
              css={isDelete ? deleteStyles['active'] : deleteStyles['inactive']}
            >
              {isDelete && 'Confirm'}
              <TrashIcon tw="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CalculationForm;
