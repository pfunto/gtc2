import 'twin.macro';
import 'styled-components/macro';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PurchaseState } from '../app/store';
import AddBuyer from '../components/Buyer/AddBuyer';
import AddTaxTip from '../components/Calculation/AddTaxTip';
import { createBuyerReceipts } from '../components/Calculation/calculationSlice';
import AddItem from '../components/Item/AddItem';
import { createPurchase } from '../services/PurchaseService';

type Inputs = {
  title: string;
};

const CalculationForm = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user.id);
  const purchaseState: PurchaseState = useAppSelector((state) => ({
    buyer: state.buyer,
    item: state.item,
    buyerItem: state.buyerItem,
    calculation: state.calculation,
  }));

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ title }) => {
    dispatch(createBuyerReceipts(purchaseState));
    if (userId) createPurchase({ state: purchaseState, userId, title });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Title here</h2>
        <input
          tw="mr-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-8 sm:text-sm border-gray-500 border"
          {...register('title', { required: true })}
        />
        <AddBuyer />
        <AddItem />
        <AddTaxTip />
        <button type="submit">Calc</button>
      </form>
    </>
  );
};

export default CalculationForm;
