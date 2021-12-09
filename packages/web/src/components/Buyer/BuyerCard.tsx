import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Buyer, editBuyer, removeBuyer } from './buyerSlice';
import ItemList from '../Item/ItemList';

type Inputs = {
  editName: string;
};

interface BuyerProps {
  buyer: Buyer;
}

const buyerCard = ({ buyer }: BuyerProps) => {
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={() => {
          setShowItems(!showItems);
        }}
      >
        <img src="https://via.placeholder.com/50" alt="placeholder" />

        {isEdit ? (
          <input data-testid="editName" {...register('editName')} />
        ) : (
          <span>{name}</span>
        )}

        <button
          type="submit"
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        >
          Edit
        </button>

        <button
          onClick={() => {
            dispatch(removeBuyer(id));
          }}
        >
          X
        </button>
      </form>
      {showItems ? <ItemList buyerId={id} /> : ''}
    </>
  );
};

export default buyerCard;
