import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PurchaseState } from '../app/store';
import AddBuyer from '../components/Buyer/AddBuyer';
import AddTaxTip from '../components/Calculation/AddTaxTip';
import { createBuyerReceipts } from '../components/Calculation/calculationSlice';
import AddItem from '../components/Item/AddItem';
import SlideOut from '../components/ui/SlideOut';
import { createPurchase } from '../services/PurchaseService';

const CalculationForm = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user.id);
  const purchaseState: PurchaseState = useAppSelector((state) => ({
    buyer: state.buyer,
    item: state.item,
    buyerItem: state.buyerItem,
    calculation: state.calculation,
  }));

  return (
    <>
      <AddBuyer />
      <AddItem />
      <AddTaxTip />
      <button
        onClick={() => {
          dispatch(createBuyerReceipts(purchaseState));
          if (userId) createPurchase(purchaseState, userId);
        }}
      >
        Calc
      </button>
      <SlideOut />
    </>
  );
};

export default CalculationForm;
