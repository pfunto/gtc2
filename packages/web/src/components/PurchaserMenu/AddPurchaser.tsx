import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addPurchaser } from './purchaserSlice';

type Inputs = {
  name: string;
};

export default function App() {
  // const purchaser = useAppSelector((state) => state.purchaser.byId);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('name')); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input {...register('name', { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.name && <span>This field is required</span>}

      <input type="submit" onClick={() => dispatch(addPurchaser())} />
    </form>
  );
}

// connect(({ name }) => ({ name }), updateAction)(YourForm);
