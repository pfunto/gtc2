import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addBuyer } from './buyerSlice';
import BuyerCard from './BuyerCard';
import 'twin.macro';

type Inputs = {
  name: string;
};

const AddBuyer = () => {
  const buyer = useAppSelector((state) => state.buyer);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ name }) =>
    dispatch(addBuyer({ id: buyer.counter.toString(), name: name }));

  console.log(watch('name')); // watch input value by passing the name of it

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input data-testid="name" {...register('name', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.name && <span>This field is required</span>}

        <input type="submit" />
      </form>

      <div tw="flow-root w-2/5">
        <ul tw="-my-5 divide-y divide-gray-200">
          {Object.entries(buyer.byId).map(([key, buyer]) => {
            return <BuyerCard key={key} buyer={buyer} />;
          })}
        </ul>
      </div>
    </>
  );
};

export default AddBuyer;
