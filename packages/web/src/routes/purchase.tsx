import { useEffect } from 'react';
import { useParams } from 'react-router';
import AddBuyer from '../components/Buyer/AddBuyer';
import AddItem from '../components/Item/AddItem';
import { useAppDispatch } from '../app/hooks';
import { initializeBuyers } from '../components/Buyer/buyerSlice';

import ky from 'ky';
import { PurchaseState } from '../app/store';
import { initializeItems } from '../components/Item/itemSlice';
import { initializeBuyerItem } from '../components/Buyer/buyerItemSlice';

interface PurchaseResponse {
  id: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  state: PurchaseState;
}

async function getUserPurchase(purchaseId: string): Promise<PurchaseResponse> {
  return await ky
    .get(`http://localhost:8888/api/purchases/${purchaseId}`)
    .json();
}

const Purchase = () => {
  const dispatch = useAppDispatch();
  let { purchaseId } = useParams();
  console.log(purchaseId);

  useEffect(() => {
    if (purchaseId) {
      getUserPurchase(purchaseId)
        .then((response) => {
          console.log('response', response);
          dispatch(initializeBuyers(response.state.buyer));
          dispatch(initializeItems(response.state.item));
          dispatch(initializeBuyerItem(response.state.buyerItem));
        })
        .catch((err) => console.log(err));
    }
  });

  return (
    <main>
      <h2>Purchases</h2>
      <AddBuyer />
      <AddItem />
    </main>
  );
};

export default Purchase;
