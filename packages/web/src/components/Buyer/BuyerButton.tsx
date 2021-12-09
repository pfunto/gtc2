import { useState, useEffect } from 'react';
import 'twin.macro';
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
          tw="flex flex-col items-center bg-green-500"
          onClick={() => {
            dispatch(removeBuyerItem({ buyerId, itemId }));
            setIsSelected(!isSelected);
          }}
        >
          id: {buyerId} name: {name}
        </button>
      ) : (
        <button
          tw="flex flex-col items-center bg-gray-100"
          onClick={() => {
            dispatch(joinBuyerItem({ buyerId, itemId }));
            setIsSelected(!isSelected);
          }}
        >
          id: {buyerId} name: {name}
        </button>
      )}
    </>
  );
};

export default BuyerButton;
