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

interface ItemProps {
  item: Item;
}

const ItemCard = ({ item }: ItemProps) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [showBuyers, setShowBuyers] = useState(false);
  const { id, name, price } = item;

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { editName: name, editPrice: price },
  });
  const onSubmit: SubmitHandler<Inputs> = async ({ editName, editPrice }) => {
    dispatch(editItem({ id: id, name: editName, price: editPrice }));
    // dispatch(createBuyerReceipts(purchaseState));
  };

  return (
    <>
      <li tw="py-4">
        <form
          tw="flex items-center space-x-4 p-4"
          // onSubmit={handleSubmit(onSubmit)}
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
                <input
                  tw="flex items-center text-sm font-medium text-gray-900 truncate border border-gray-400 rounded-md pl-2 mb-1 w-1/3"
                  data-testid="editName"
                  {...register('editName')}
                />
                <div tw="mt-1 relative rounded-md shadow-sm">
                  <div tw="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span tw="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    step=".01"
                    tw="flex items-center text-sm font-medium text-gray-900 truncate border border-gray-400 rounded-md p-0 pl-8 w-1/3"
                    {...register('editPrice', {
                      min: {
                        value: 0,
                        message: 'Price cannot be less than 0',
                      },
                      required: {
                        value: true,
                        message: 'This field is required',
                      },
                      pattern: {
                        value: /^(?:0|[1-9][0-9]*)(?:\.[0-9]{1,2})?$/,
                        message: 'Please enter a valid dollar amount',
                      },
                      valueAsNumber: true,
                    })}
                  />
                </div>
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
              type="button"
              tw="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                setIsEdit(!isEdit);
                setShowBuyers(!showBuyers);

                if (isEdit) {
                  handleSubmit(onSubmit)();
                }
              }}
            >
              Edit
            </button>
            <button
              type="button"
              tw="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                dispatch(unjoinBuyers({ itemId: id }));
                dispatch(removeItem({ itemId: id }));
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
