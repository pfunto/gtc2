import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addBuyer } from './buyerSlice';
import BuyerCard from './BuyerCard';

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

      <div>
        {Object.entries(buyer.byId).map(([key, buyer]) => {
          return (
            <div key={key}>
              <BuyerCard buyer={buyer} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddBuyer;
