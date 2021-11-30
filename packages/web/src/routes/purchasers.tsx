import { useParams } from 'react-router';
import AddPurchaser from '../components/Purchaser/AddPurchaser';
import { useAppDispatch } from '../app/hooks';
import { initializePurchasers } from '../components/Purchaser/purchaserSlice';

import ky from 'ky';
import { useEffect } from 'react';
import { PurchaseState } from '../app/store';

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
          console.log('response', response.state.purchaser);
          dispatch(initializePurchasers(response.state.purchaser));
        })
        .catch((err) => console.log(err));
    }
  });

  return (
    <main>
      <h2>Purchasers</h2>
      <AddPurchaser />
    </main>
  );
};

export default Purchasers;
