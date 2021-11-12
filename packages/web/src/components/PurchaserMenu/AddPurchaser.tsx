import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addPurchaser } from './purchaserSlice';
import PurchaserItem from './PurchaserItem';

type Inputs = {
  name: string;
};

const AddPurchaser = () => {
  const purchaser = useAppSelector((state) => state.purchaser);
  const dispatch = useAppDispatch();

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('name')); // watch input value by passing the name of it

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input {...register('name', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.name && <span>This field is required</span>}

        <input
          type="submit"
          onClick={() => {
            const name = getValues('name');
            dispatch(
              addPurchaser({ id: purchaser.counter.toString(), name: name })
            );
            console.log('submitted', {
              id: purchaser.counter.toString(),
              name: name,
            });
          }}
        />
      </form>

      <div>
        {Object.entries(purchaser.byId).map(([key, value]) => {
          return (
            <div key={key}>
              <PurchaserItem value={value} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddPurchaser;
