import { useState, useEffect } from 'react';
import 'twin.macro';
import 'styled-components/macro';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Buyer } from './buyerSlice';
import { joinBuyerItem, removeBuyerItem } from '../Buyer/buyerItemSlice';

interface BuyerButtonProps {
  itemId: string;
  buyer: Buyer;
}

const BuyerButton = ({ itemId, buyer }: BuyerButtonProps) => {
  const buyerItemIds = useAppSelector((state) => state.buyerItem.byId);
  const dispatch = useAppDispatch();
  const { id: buyerId, name } = buyer;

  const [isSelected, setIsSelected] = useState<boolean | undefined>();

  useEffect(() => {
    const buyerItemId = buyerId + '.' + itemId;
    setIsSelected(buyerItemId in buyerItemIds);
  }, [buyerItemIds, buyerId, itemId]);

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
          {name}
        </button>
      ) : (
        <button
          tw="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 ml-1"
          onClick={() => {
            dispatch(joinBuyerItem({ buyerId, itemId }));
            setIsSelected(!isSelected);
          }}
        >
          {name}
        </button>
      )}
    </>
  );
};

export default BuyerButton;
