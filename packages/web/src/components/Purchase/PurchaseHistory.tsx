import 'twin.macro';
import 'styled-components/macro';
import PurchaseCard from './PurchaseCard';
import { useAppSelector } from '../../app/hooks';
import { getPurchasesByUid, Purchase } from '../../services/PurchaseService';
import { useEffect, useState } from 'react';

const PurchaseHistory = () => {
  const uid = useAppSelector((state) => state.auth.user.id);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const fetchPurchases = async (uid: string) => {
      const response = await getPurchasesByUid(uid);
      setPurchases(typeof response == 'string' ? [] : response);
    };
    if (uid) fetchPurchases(uid);
  }, [uid]);

  return (
    <div tw="bg-white shadow overflow-hidden sm:rounded-md p-4 w-full">
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
