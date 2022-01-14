import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import 'twin.macro';
import 'styled-components/macro';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { createBuyerReceipts } from '../Calculation/calculationSlice';

type Inputs = {
  title: string;
};

const AddPurchaseTitle = () => {
  const purchaseState = useAppSelector((state) => state);
  const buyer = useAppSelector((state) => state.buyer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(createBuyerReceipts(purchaseState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, buyer.byId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ title }) => title;

  return (
    <>
      <div tw="flex flex-col items-center">
        <form tw="p-8" onSubmit={handleSubmit(onSubmit)}>
          <label tw="block text-sm font-medium text-gray-700">Name</label>
          <div tw="mt-1 relative rounded-md shadow-sm">
            <div tw="relative flex flex-col">
              <div tw="flex">
                <div tw="flex relative items-stretch flex-grow focus-within:z-10">
                  <input
                    tw="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-8 sm:text-sm border-gray-500 border"
                    {...register('title', { required: true })}
                  />
                  {errors.title && (
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
                  tw="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ml-1"
                >
                  Submit
                </button>
              </div>
              {errors.title && (
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

export default AddPurchaseTitle;