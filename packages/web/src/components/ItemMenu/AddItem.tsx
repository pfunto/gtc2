import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addItem } from './itemSlice';
import ItemCard from './ItemCard';
// import CurrencyInput from '../CurrencyInput';

type Inputs = {
  name: string;
  price: number;
};

const AddItem = () => {
  const item = useAppSelector((state) => state.item);
  const dispatch = useAppDispatch();
  // const [price, setPrice] = useState<number>(0);

  const methods = useForm<Inputs>({ defaultValues: { price: 0 } });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;
  const onSubmit: SubmitHandler<Inputs> = ({ name, price }) =>
    dispatch(
      addItem({ id: item.counter.toString(), name: name, price: price })
    );

  const watchPrice = watch('price');

  useEffect(() => {
    console.log('watchPrice', watchPrice);
  }, [watchPrice]);

  // const onValueChange = (value: number) => {
  //   // setPrice(value);
  //   // setPrice(parseInt(price.toString() + value.toString()));

  //   console.log('getValues', getValues('price'));

  //   console.log('value', value);
  //   setValue('price', value);

  //   // setValue(val);
  // };

  // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log('e.target.value', e.target.value);
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Item</label>
        <input data-testid="name" {...register('name', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.name && <span>This field is required</span>}

        <input
          {...register('price', { required: true, valueAsNumber: true })}
        />
        {errors.price && <span>This field is required</span>}

        {/* <Controller
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
        /> */}

        <input type="submit" />
      </form>

      <div>
        {Object.entries(item.byId).map(([key, value]) => {
          return (
            <div key={key}>
              <ItemCard value={value} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddItem;
