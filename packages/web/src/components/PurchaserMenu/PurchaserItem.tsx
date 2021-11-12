import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Purchaser, editPurchaser } from './purchaserSlice';

type Inputs = {
  editName: string;
};

interface PurchaserProps {
  value: Purchaser;
}

const PurchaserItem = ({ value }: PurchaserProps) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { id, name } = value;

  const { register, getValues, handleSubmit } = useForm<Inputs>({
    defaultValues: { editName: name },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <img src="https://via.placeholder.com/50" alt="placeholder" />
        {isEdit ? <input {...register('editName')} /> : <span>{name}</span>}
        <button
          type="submit"
          onClick={() => {
            const editName = getValues('editName');
            setIsEdit(!isEdit);
            if (isEdit === true) {
              dispatch(editPurchaser({ id: id, name: editName }));
            }
          }}
        >
          Edit
        </button>
      </form>
    </>
  );
};

export default PurchaserItem;
