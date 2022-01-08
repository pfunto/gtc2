import { useAppDispatch, useAppSelector } from '../app/hooks';
import AddBuyer from '../components/Buyer/AddBuyer';
import AddTaxTip from '../components/Calculation/AddTaxTip';
import { createBuyerReceipts } from '../components/Calculation/calculationSlice';
import AddItem from '../components/Item/AddItem';
import SlideOut from '../components/ui/SlideOut';

const CalculationForm = () => {
  const dispatch = useAppDispatch();
  const purchaseState = useAppSelector((state) => state);

  return (
    <>
      <AddBuyer />
      <AddItem />
      <AddTaxTip />
      <button
        onClick={() => {
          dispatch(createBuyerReceipts(purchaseState));
        }}
      >
        Calc
      </button>
      <SlideOut />
    </>
  );
};

export default CalculationForm;
