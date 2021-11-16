import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addItem } from './itemSlice';

type Inputs = {
  name: string;
  price: number;
};

const AddItem = () => {
  // const item = useAppSelector((state) => state.item);
  const dispatch = useAppDispatch();

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('name'), watch('price'));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Item</label>
        <input data-testid="name" {...register('name', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.name && <span>This field is required</span>}

        {/* <input
          type="number"
          pattern="^-?[0-9]\d*\.?d*$"
          data-testid="price"
          {...register('price', { required: true, valueAsNumber: true })}
        /> */}

        <input type="submit" onClick={() => {}} />
      </form>
    </>
  );
};

export default AddItem;
