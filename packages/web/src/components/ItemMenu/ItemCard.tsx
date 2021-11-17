import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Item, editItem, removeItem } from './itemSlice';

type Inputs = {
  editName: string;
  editPrice: number;
};

interface PurchaserProps {
  value: Item;
}

const ItemCard = ({ value }: PurchaserProps) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { id, name, price } = value;

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { editName: name, editPrice: price },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ editName, editPrice }) =>
    dispatch(editItem({ id: id, name: editName, price: editPrice }));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <img src="https://via.placeholder.com/50" alt="placeholder" />

        {isEdit ? (
          <>
            <input data-testid="editName" {...register('editName')} />
            <input {...register('editPrice')} />
          </>
        ) : (
          <>
            <span>{name}</span>
            <span>{price}</span>
          </>
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
            dispatch(removeItem(id));
          }}
        >
          X
        </button>
      </form>
    </>
  );
};

export default ItemCard;
