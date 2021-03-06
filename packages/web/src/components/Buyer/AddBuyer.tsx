import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addBuyer } from './buyerSlice';
import BuyerCard from './BuyerCard';
import 'twin.macro';
import 'styled-components/macro';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

type Inputs = {
  name: string;
};

const AddBuyer = () => {
  const buyer = useAppSelector((state) => state.buyer);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ name }) =>
    dispatch(addBuyer({ id: buyer.counter.toString(), name: name }));

  return (
    <>
      <div tw="flex flex-col items-center w-full mt-12 bg-white overflow-hidden shadow rounded-lg p-4">
        <h3 tw="font-bold text-lg mb-8">BUYERS</h3>

        <div tw="flow-root w-full">
          <ul tw="-my-5 divide-y divide-gray-200">
            {Object.entries(buyer.byId).map(([key, buyer]) => {
              return <BuyerCard key={key} buyer={buyer} />;
            })}
          </ul>
        </div>

        <form tw="p-4 w-full" onSubmit={handleSubmit(onSubmit)}>
          <label tw="block text-sm font-medium text-gray-700">Name</label>
          <div tw="mt-1 relative rounded-md shadow-sm">
            <div tw="relative flex flex-col">
              <div tw="flex">
                <div tw="flex relative items-stretch flex-grow focus-within:z-10">
                  <input
                    tw="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-8 sm:text-sm border-gray-500 border"
                    {...register('name', { required: true })}
                    placeholder="Name (e.g. Gus)"
                  />
                  {errors.name && (
                    <div tw="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon
                        tw="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  tw="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-1"
                >
                  Add Buyer
                </button>
              </div>
              {errors.name && (
                <p
                  tw="absolute top-full mt-2 text-sm text-red-600"
                  id="email-error"
                >
                  This field is required
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBuyer;
