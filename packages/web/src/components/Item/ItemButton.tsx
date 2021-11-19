import { useEffect, useState } from 'react';
import 'twin.macro';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Item } from './itemSlice';
import {
  joinPurchaserItem,
  removePurchaserItem,
} from '../Purchaser/purchaserItemSlice';

interface ItemButtonProps {
  purchaserId: string;
  item: Item;
}

const ItemButton = ({ purchaserId, item }: ItemButtonProps) => {
  const purchaserItemIds = useAppSelector((state) => state.purchaserItem.byId);
  const dispatch = useAppDispatch();
  const { id: itemId, name, price } = item;
  const purchaserItemId = purchaserId + '.' + itemId;

  const [isSelected, setIsSelected] = useState<boolean | undefined>();

  useEffect(() => {
    setIsSelected(purchaserItemId in purchaserItemIds);
  }, [purchaserItemIds, purchaserItemId]);

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
          id: {itemId} name: {name} price: {price}
        </button>
      ) : (
        <button
          tw="flex flex-col items-center bg-gray-100"
          onClick={() => {
            dispatch(joinPurchaserItem({ purchaserId, itemId }));
            setIsSelected(!isSelected);
          }}
        >
          id: {itemId} name: {name} price: {price}
        </button>
      )}
    </>
  );
};

export default ItemButton;
