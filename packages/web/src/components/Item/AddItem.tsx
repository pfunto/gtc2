import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addItem } from './itemSlice';
import ItemCard from './ItemCard';
// import CurrencyInput from '../CurrencyInput';
import 'twin.macro';
import 'styled-components/macro';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

type Inputs = {
  name: string;
  price: number;
};

const AddItem = () => {
  const item = useAppSelector((state) => state.item);
  const dispatch = useAppDispatch();
  // const [price, setPrice] = useState<number>(0);

  const methods = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: { price: 0 },
  });
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
      <div tw="flex flex-col items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div tw="mt-1 relative rounded-md shadow-sm">
            <div tw="relative flex flex-col">
              <div tw="flex ">
                <div tw="flex relative items-stretch flex-grow focus-within:z-10">
                  <label
                    htmlFor="name"
                    tw="absolute -top-6 block text-sm font-medium text-gray-700"
                  >
                    Item
                  </label>
                  <input
                    data-testid="name"
                    tw="mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-10 sm:text-sm border-gray-500 border"
                    {...register('name', { required: true })}
                  />
                  {errors.name && (
                    <>
                      <div tw="absolute inset-y-0 right-5 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                          tw="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>

                      <p tw="absolute top-full mt-2 text-sm text-red-600">
                        This field is required
                      </p>
                    </>
                  )}
                </div>

                <div tw="flex relative items-stretch flex-grow focus-within:z-10">
                  <label
                    htmlFor="price"
                    tw="absolute -top-6 block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    step=".01"
                    tw="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-10 sm:text-sm border-gray-500 border"
                    {...register('price', {
                      min: { value: 0, message: 'Price cannot be less than 0' },
                      required: {
                        value: true,
                        message: 'This field is required',
                      },
                      pattern: {
                        value:
                          /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/,
                        message: 'Please enter a valid dollar amount',
                      },
                    })}
                  />
                  {errors.price && (
                    <>
                      <div tw="absolute inset-y-0 right-5 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                          tw="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>

                      <p tw="absolute top-full mt-2 text-sm text-red-600">
                        {errors.price.message}
                      </p>
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  tw="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ml-1"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>

        <div tw="flow-root w-3/5">
          <ul tw="-my-5 divide-y divide-gray-200">
            {Object.entries(item.byId).map(([key, value]) => {
              return <ItemCard key={key} value={value} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddItem;
