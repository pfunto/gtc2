import 'twin.macro';
import 'styled-components/macro';
import { useAppDispatch } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addTaxTip } from './calculationSlice';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

type Inputs = {
  tax: number;
  tip: number;
};

const AddTaxTip = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<Inputs> = ({ tax, tip }) => {
    dispatch(addTaxTip({ tax: tax / 100, tip: tip / 100 }));
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="tax">Tax</label>
        <input
          placeholder="0"
          {...register('tax', {
            min: { value: 0, message: 'Your tax cannot be less than 0' },
            max: { value: 100, message: 'Your tax cannot be more than 100' },
          })}
        />
        {errors.tax && <span>{errors.tax.message}</span>}
        <div>
          <label htmlFor="tip">Tip</label>
          <input placeholder="0" {...register('tip', { min: 0 })} />
          {errors.tip && <span>Your tip percentage can't be less than 0</span>}
        </div>

        <button type="submit">Calculate</button>
      </form> */}
      <div tw="flex flex-col items-center">
        <form tw="p-8" onSubmit={handleSubmit(onSubmit)}>
          <div tw="mt-1 relative rounded-md shadow-sm">
            <div tw="relative flex flex-col">
              <div tw="flex ">
                <div tw="flex relative items-stretch flex-grow focus-within:z-10 mr-1">
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
      </div>
    </>
  );
};

export default AddTaxTip;
