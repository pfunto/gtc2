import { useEffect } from 'react';
import { useParams } from 'react-router';
import AddPurchaser from '../components/Purchaser/AddPurchaser';
import AddItem from '../components/Item/AddItem';
import { useAppDispatch } from '../app/hooks';
import { initializePurchasers } from '../components/Purchaser/purchaserSlice';

import ky from 'ky';
import { PurchaseState } from '../app/store';
import { initializeItems } from '../components/Item/itemSlice';

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

const Purchasers = () => {
  const dispatch = useAppDispatch();
  let { purchaseId } = useParams();
  console.log(purchaseId);

  useEffect(() => {
    if (purchaseId) {
      getUserPurchase(purchaseId)
        .then((response) => {
          console.log('response', response);
          dispatch(initializePurchasers(response.state.purchaser));
          dispatch(initializeItems(response.state.item));
        })
        .catch((err) => console.log(err));
    }
  });

  return (
    <main>
      <h2>Purchases</h2>
      <AddPurchaser />
      <AddItem />
    </main>
  );
};

export default Purchasers;
