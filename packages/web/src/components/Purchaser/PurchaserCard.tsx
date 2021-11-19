import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Purchaser, editPurchaser, removePurchaser } from './purchaserSlice';
import ItemList from '../Item/ItemList';

type Inputs = {
  editName: string;
};

interface PurchaserProps {
  purchaser: Purchaser;
}

const PurchaserCard = ({ purchaser }: PurchaserProps) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const { id, name } = purchaser;

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { editName: name },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ editName }) =>
    dispatch(editPurchaser({ id: id, name: editName }));

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
            dispatch(removePurchaser(id));
          }}
        >
          X
        </button>
      </form>
      {showItems ? <ItemList purchaserId={id} /> : ''}
    </>
  );
};

export default PurchaserCard;
