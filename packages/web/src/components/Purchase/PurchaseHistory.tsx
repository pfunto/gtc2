import 'twin.macro';
import 'styled-components/macro';
import PurchaseCard from './PurchaseCard';
import { useAppSelector } from '../../app/hooks';
import { getPurchasesByUid, Purchase } from '../../services/PurchaseService';
import { useEffect, useState } from 'react';

const PurchaseHistory = () => {
  const state = useAppSelector((state) => state);
  const uid = useAppSelector((state) => state.auth.user.id);
  const [purchases, setPurchases] = useState<Purchase[]>();

  useEffect(() => {
    const fetchPurchases = async (uid: string) => {
      const response = await getPurchasesByUid(uid);
      setPurchases(response);
    };

    fetchPurchases(uid);
  }, [uid, state]);

  console.log(`purchases`, purchases);

  return (
    <div tw="bg-white shadow overflow-hidden sm:rounded-md">
      <ul tw="divide-y divide-gray-200">
        {purchases
          ? purchases.map((purchase) => {
              return <PurchaseCard key={purchase.id} purchase={purchase} />;
            })
          : ''}
      </ul>
    </div>
  );
};

export default PurchaseHistory;
