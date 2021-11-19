import { useState, useEffect } from 'react';
import 'twin.macro';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Purchaser } from './purchaserSlice';
import {
  joinPurchaserItem,
  removePurchaserItem,
} from '../Purchaser/purchaserItemSlice';

interface PurchaserButtonProps {
  itemId: string;
  purchaser: Purchaser;
}

const PurchaserButton = ({ itemId, purchaser }: PurchaserButtonProps) => {
  const purchaserItemIds = useAppSelector((state) => state.purchaserItem.byId);
  const dispatch = useAppDispatch();
  const { id: purchaserId, name } = purchaser;

  const [isSelected, setIsSelected] = useState<boolean | undefined>();

  useEffect(() => {
    const purchaserItemId = purchaserId + '.' + itemId;
    setIsSelected(purchaserItemId in purchaserItemIds);
  }, [purchaserItemIds, purchaserId, itemId]);

  return (
    <>
      {isSelected ? (
        <button
          tw="flex flex-col items-center bg-green-500"
          onClick={() => {
            dispatch(removePurchaserItem({ purchaserId, itemId }));
            setIsSelected(!isSelected);
          }}
        >
          id: {purchaserId} name: {name}
        </button>
      ) : (
        <button
          tw="flex flex-col items-center bg-gray-100"
          onClick={() => {
            dispatch(joinPurchaserItem({ purchaserId, itemId }));
            setIsSelected(!isSelected);
          }}
        >
          id: {purchaserId} name: {name}
        </button>
      )}
    </>
  );
};

export default PurchaserButton;
