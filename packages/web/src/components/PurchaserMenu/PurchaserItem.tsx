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

const PurchaserItem = ({ value }: PurchaserProps) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { id, name } = value;

  const { register, getValues, handleSubmit } = useForm<Inputs>({
    defaultValues: { editName: name },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
          onClick={() => {
            const editName = getValues('editName');

            console.log('editName :>> ', editName);

            setIsEdit(!isEdit);

            if (isEdit) {
              dispatch(editPurchaser({ id: id, name: editName }));
            }
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

export default PurchaserItem;
