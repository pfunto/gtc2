import 'twin.macro';
import 'styled-components/macro';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useForm } from 'react-hook-form';
import { addTaxTip } from './calculationSlice';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';

type Inputs = {
  tax: number;
  tip: number;
};

const AddTaxTip = ({ isLoaded }: { isLoaded: boolean }) => {
  const dispatch = useAppDispatch();
  const taxTipState = useAppSelector((state) => state.calculation.taxTip);

  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    defaultValues: { tax: taxTipState.tax * 100, tip: taxTipState.tip * 100 },
    mode: 'onBlur',
  });

  const watchTax = watch('tax');
  const watchTip = watch('tip');

  useEffect(() => {
    if (isLoaded) {
      setValue('tax', taxTipState.tax * 100);
      setValue('tip', taxTipState.tip * 100);
    }
  }, [taxTipState, setValue, isLoaded]);

  useEffect(() => {
    dispatch(addTaxTip({ tax: watchTax / 100, tip: watchTip / 100 }));
  }, [dispatch, watchTax, watchTip]);

  return (
    <>
      <div tw="flex flex-col items-center w-full my-12 bg-white overflow-hidden shadow rounded-lg p-4">
        <form tw="p-4 w-full">
          <div tw="mt-1 relative rounded-md shadow-sm">
            <div tw="relative flex flex-col">
              <div tw="flex ">
                <div tw="flex relative items-stretch focus-within:z-10 mr-1">
                  <label
                    htmlFor="tax"
                    tw="absolute -top-6 block text-sm font-medium text-gray-700"
                  >
                    Tax
                  </label>
                  <div tw="relative">
                    <div tw="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span tw="text-gray-500 sm:text-sm">%</span>
                    </div>
                    <input
                      type="number"
                      step=".01"
                      tw="focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full rounded-md pl-8 sm:text-sm border-gray-500 border"
                      {...register('tax', {
                        min: {
                          value: 0,
                          message: 'Your tax cannot be less than 0',
                        },
                        max: {
                          value: 100,
                          message: 'Your tax cannot be more than 100',
                        },
                        pattern: {
                          value: /^(?:0|[1-9][0-9]*)(?:\.[0-9]{1,2})?$/,
                          message: 'Please enter a valid percentage',
                        },
                      })}
                    />
                    {errors.tax && (
                      <>
                        <div tw="absolute inset-y-0 right-5 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            tw="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>

                        <p tw="absolute top-full mt-2 text-sm text-red-600">
                          {errors.tax.message}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div tw="flex relative items-stretch flex-grow focus-within:z-10">
                  <label
                    htmlFor="tip"
                    tw="absolute -top-6 block text-sm font-medium text-gray-700"
                  >
                    Tip
                  </label>
                  <div tw="relative">
                    <div tw="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span tw="text-gray-500 sm:text-sm">%</span>
                    </div>
                    <input
                      type="number"
                      step=".01"
                      tw="focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full rounded-md pl-8 sm:text-sm border-gray-500 border"
                      {...register('tip', {
                        min: {
                          value: 0,
                          message: 'Your tip cannot be less than 0',
                        },
                        pattern: {
                          value: /^(?:0|[1-9][0-9]*)(?:\.[0-9]{1,2})?$/,
                          message: 'Please enter a valid percentage',
                        },
                      })}
                    />
                    {errors.tip && (
                      <>
                        <div tw="absolute inset-y-0 right-5 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            tw="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>

                        <p tw="absolute top-full mt-2 text-sm text-red-600">
                          {errors.tip.message}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTaxTip;
