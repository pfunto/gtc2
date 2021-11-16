import React, { useEffect, KeyboardEvent, ChangeEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { addItem } from './itemSlice';
import CurrencyInput from '../CurrencyInput';

type Inputs = {
  name: string;
  price: number;
};

const AddItem = () => {
  // const item = useAppSelector((state) => state.item);
  const dispatch = useAppDispatch();
  // const [price, setPrice] = useState<number>(0);

  const methods = useForm<Inputs>({ defaultValues: { price: 0 } });
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = methods;
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const watchPrice = watch('price');

  useEffect(() => {
    console.log('watchPrice', watchPrice);
  }, [watchPrice]);

  const onValueChange = (value: number) => {
    // setPrice(value);
    // setPrice(parseInt(price.toString() + value.toString()));

    console.log('getValues', getValues('price'));

    console.log('value', value);
    setValue('price', value);

    // setValue(val);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('e.target.value', e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Item</label>
        <input data-testid="name" {...register('name', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.name && <span>This field is required</span>}

        {/* <input
          {...register('price', {
            // valueAsNumber: true,
            onChange,
          })}
        /> */}

        <Controller
          control={control}
          name="price"
          render={({ field: { value, onChange } }) => (
            <CurrencyInput
              // {...field}
              value={value}
              onChange={onChange}
              onValueChange={onValueChange}
              max={1000}
            />
          )}
        />

        {/* <CurrencyInput
          max={10000000}
          // value={0}
          register={{
            ...register('price', {
              required: true,
              onChange: (e) => console.log(e),
            }),
          }}
          watch={watch}
        /> */}

        <input type="submit" onClick={() => {}} />
      </form>
    </>
  );
};

export default AddItem;
