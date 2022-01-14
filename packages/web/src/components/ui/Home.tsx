import 'twin.macro';
import 'styled-components/macro';
import PurchaseHistory from '../Purchase/PurchaseHistory';
import { useNavigate } from 'react-router';
import { clearBuyers } from '../Buyer/buyerSlice';
import { useAppDispatch } from '../../app/hooks';
import { clearItems } from '../Item/itemSlice';
import { clearBuyerItem } from '../Buyer/buyerItemSlice';
// import { PlusSmIcon } from '@heroicons/react/solid';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <>
      <div tw="flex flex-col items-center">
        <button
          onClick={() => {
            dispatch(clearBuyers());
            dispatch(clearItems());
            dispatch(clearBuyerItem());
            navigate('/purchases/create-purchase');
          }}
          tw="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ml-1"
        >
          Create Purchase
        </button>
        <PurchaseHistory />
      </div>
    </>
  );
};

export default Home;
