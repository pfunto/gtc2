import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Item, editItem, removeItem } from './itemSlice';
import BuyerList from '../Buyer/BuyerList';
import { currencyFormatter } from './ItemButton';
import 'twin.macro';
import 'styled-components/macro';
import { unjoinBuyers } from '../Buyer/buyerItemSlice';

type Inputs = {
  editName: string;
  editPrice: number;
};

interface BuyerProps {
  value: Item;
}

const ItemCard = ({ value }: BuyerProps) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [showBuyers, setShowBuyers] = useState(false);
  const { id, name, price } = value;

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { editName: name, editPrice: price },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ editName, editPrice }) =>
    dispatch(editItem({ id: id, name: editName, price: editPrice }));

  return (
    <>
      <li tw="py-4">
        <form
          tw="flex items-center space-x-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div tw="flex-shrink-0">
            <img
              tw="h-8 w-8 rounded-full"
              src="https://via.placeholder.com/50"
              alt=""
            />
          </div>
          <div tw="flex-1 min-w-0">
            {isEdit ? (
              <>
                <input data-testid="editName" {...register('editName')} />
                <input {...register('editPrice')} />
              </>
            ) : (
              <>
                <span tw="flex items-center text-sm font-medium text-gray-900 truncate">
                  {name}
                </span>

                <span tw="flex items-center text-sm font-medium text-gray-900 truncate">
                  {currencyFormatter.format(price)}
                </span>
              </>
            )}
          </div>
          <div>
            <button
              type="submit"
              tw="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                setIsEdit(!isEdit);
                setShowBuyers(!showBuyers);
              }}
            >
              Edit
            </button>
            <button
              type="submit"
              tw="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                dispatch(unjoinBuyers(id));
                dispatch(removeItem(id));
              }}
            >
              X
            </button>
          </div>
        </form>
        {showBuyers ? <BuyerList itemId={id} /> : ''}
      </li>
    </>
  );
};

export default ItemCard;
