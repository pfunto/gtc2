import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addItem } from './itemSlice';
import ItemCard from './ItemCard';
// import CurrencyInput from '../CurrencyInput';
import 'twin.macro';

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
          {...register('price', {
            min: { value: 0, message: 'Price cannot be less than 0' },
            required: { value: true, message: 'This field is required' },
            valueAsNumber: true,
          })}
        />
        {errors.price && <span>{errors.price.message}</span>}

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

      <div tw="flow-root w-2/5">
        <ul tw="-my-5 divide-y divide-gray-200">
          {Object.entries(item.byId).map(([key, value]) => {
            return <ItemCard key={key} value={value} />;
          })}
        </ul>
      </div>
    </>
  );
};

export default AddItem;
