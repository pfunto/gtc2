import { useState } from 'react';
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
  const purchaserIds = useAppSelector((state) => state.purchaserItem.allIds);
  const dispatch = useAppDispatch();
  const { id, name, price } = item;
  const purchaserItemId = purchaserId + '.' + id;

  const [isSelected, setIsSelected] = useState(
    purchaserIds.includes(purchaserItemId)
  );

  return (
    <>
      {isSelected ? (
        <button
          tw="flex flex-col items-center bg-green-500"
          onClick={() => {
            dispatch(
              removePurchaserItem({ purchaserId: purchaserId, itemId: id })
            );
            setIsSelected(!isSelected);
          }}
        >
          id: {id} name: {name} price: {price}
        </button>
      ) : (
        <button
          tw="flex flex-col items-center bg-gray-100"
          onClick={() => {
            dispatch(
              joinPurchaserItem({ purchaserId: purchaserId, itemId: id })
            );
            setIsSelected(!isSelected);
          }}
        >
          id: {id} name: {name} price: {price}
        </button>
      )}
    </>
  );
};

export default ItemButton;
