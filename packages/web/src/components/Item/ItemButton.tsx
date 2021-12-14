import { useEffect, useState } from 'react';
import 'twin.macro';
import 'styled-components/macro';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Item } from './itemSlice';
import { joinBuyerItem, removeBuyerItem } from '../Buyer/buyerItemSlice';

interface ItemButtonProps {
  buyerId: string;
  item: Item;
}

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

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
          tw="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ml-1"
          onClick={() => {
            dispatch(removeBuyerItem({ buyerId, itemId }));
            setIsSelected(!isSelected);
          }}
        >
          <span>{name}</span>
          <span>{currencyFormatter.format(price)}</span>
        </button>
      ) : (
        <button
          tw="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 ml-1"
          onClick={() => {
            dispatch(joinBuyerItem({ buyerId, itemId }));
            setIsSelected(!isSelected);
          }}
        >
          <span>{name}</span>
          <span>{currencyFormatter.format(price)}</span>
        </button>
      )}
    </>
  );
};

export default ItemButton;
