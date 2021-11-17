import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Purchaser, editPurchaser, removePurchaser } from './purchaserSlice';

type Inputs = {
  editName: string;
};

interface PurchaserProps {
  value: Purchaser;
}

const PurchaserCard = ({ value }: PurchaserProps) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { id, name } = value;

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { editName: name },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ editName }) =>
    dispatch(editPurchaser({ id: id, name: editName }));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            dispatch(removePurchaser(id));
          }}
        >
          X
        </button>
      </form>
    </>
  );
};

export default PurchaserCard;
