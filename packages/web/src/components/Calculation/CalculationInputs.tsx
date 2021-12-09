import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addTaxTip, calculate, createBuyerReceipts } from './calculationSlice';

type Inputs = {
  tax: number;
  tip: number;
};

const CalculationInputs = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const calcState = useAppSelector((state) => state.calculation);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ tax, tip }) =>
    dispatch(addTaxTip({ tax, tip }));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button
          type="submit"
          onClick={() => {
            dispatch(createBuyerReceipts(state));
            dispatch(calculate(calcState));
          }}
        >
          Calculate
        </button>
      </form>
    </>
  );
};

export default CalculationInputs;
