import { useEffect, useState } from 'react';
import 'twin.macro';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Item } from './itemSlice';
import { joinBuyerItem, removeBuyerItem } from '../Buyer/buyerItemSlice';

interface ItemButtonProps {
  buyerId: string;
  item: Item;
}

const ItemButton = ({ buyerId, item }: ItemButtonProps) => {
  const buyerItemIds = useAppSelector((state) => state.buyerItem.byId);
  const dispatch = useAppDispatch();
  const { id: itemId, name, price } = item;
  const buyerItemId = buyerId + '.' + itemId;

  const [isSelected, setIsSelected] = useState<boolean | undefined>();

  useEffect(() => {
    setIsSelected(buyerItemId in buyerItemIds);
  }, [buyerItemIds, buyerItemId]);

  return (
    <>
      {isSelected ? (
        <button
          tw="flex flex-col items-center bg-green-500"
          onClick={() => {
            dispatch(removeBuyerItem({ buyerId, itemId }));
            setIsSelected(!isSelected);
          }}
        >
          id: {itemId} name: {name} price: {price}
        </button>
      ) : (
        <button
          tw="flex flex-col items-center bg-gray-100"
          onClick={() => {
            dispatch(joinBuyerItem({ buyerId, itemId }));
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
