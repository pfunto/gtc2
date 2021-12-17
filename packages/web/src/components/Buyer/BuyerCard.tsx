import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Buyer, editBuyer, removeBuyer } from './buyerSlice';
import ItemList from '../Item/ItemList';
import 'twin.macro';
import 'styled-components/macro';
import { unjoinItems } from './buyerItemSlice';
import { createBuyerReceipts } from '../Calculation/calculationSlice';

type Inputs = {
  editName: string;
};

interface BuyerProps {
  buyer: Buyer;
}

const BuyerCard = ({ buyer }: BuyerProps) => {
  const dispatch = useAppDispatch();
  const purchaseState = useAppSelector((state) => state);
  const [isEdit, setIsEdit] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const { id, name } = buyer;

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { editName: name },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ editName }) => {
    dispatch(editBuyer({ id: id, name: editName }));
    dispatch(createBuyerReceipts(purchaseState));
  };

  return (
    <>
      <li tw="py-4">
        <form tw="flex items-center space-x-4 p-4">
          <div tw="flex-shrink-0">
            <img
              tw="h-8 w-8 rounded-full"
              src="https://via.placeholder.com/50"
              alt=""
            />
          </div>
          <div tw="flex-1 min-w-0">
            {isEdit ? (
              <input
                tw="flex items-center text-sm font-medium text-gray-900 truncate border border-gray-400 rounded-md pl-2"
                data-testid="editName"
                {...register('editName')}
              />
            ) : (
              <span tw="flex items-center text-sm font-medium text-gray-900 truncate">
                {buyer.name}
              </span>
            )}
          </div>
          <div>
            <button
              type="button"
              tw="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                setIsEdit(!isEdit);
                setShowItems(!showItems);

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
                dispatch(removeBuyer({ buyerId: id }));
                dispatch(unjoinItems({ buyerId: id }));
              }}
            >
              X
            </button>
          </div>
        </form>
        {showItems ? <ItemList buyerId={id} /> : ''}
      </li>
    </>
  );
};

export default BuyerCard;
