import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Buyer, editBuyer, removeBuyer } from './buyerSlice';
import ItemList from '../Item/ItemList';
import 'twin.macro';

type Inputs = {
  editName: string;
};

interface BuyerProps {
  buyer: Buyer;
}

const BuyerCard = ({ buyer }: BuyerProps) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const { id, name } = buyer;

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { editName: name },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ editName }) =>
    dispatch(editBuyer({ id: id, name: editName }));

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
              <input data-testid="editName" {...register('editName')} />
            ) : (
              <span tw="flex items-center text-sm font-medium text-gray-900 truncate">
                {buyer.name}
              </span>
            )}
          </div>
          <div>
            <button
              type="submit"
              tw="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                setIsEdit(!isEdit);
                setShowItems(!showItems);
              }}
            >
              Edit
            </button>
            <button
              type="submit"
              tw="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                dispatch(removeBuyer(id));
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
