import 'twin.macro';
import { Link } from 'react-router-dom';
import AddBuyer from './components/Buyer/AddBuyer';
import AddItem from './components/Item/AddItem';
import { useAppSelector } from './app/hooks';

import ky from 'ky';
import { PurchaseState } from './app/store';

async function createPurchase(purchaseState: PurchaseState, userId: string) {
  const purchase = await ky.post('http://localhost:8888/api/purchases', {
    json: { state: purchaseState, userId: userId },
  });
  console.log('purchase', purchase);
  return purchase;
}

const App = () => {
  const purchaseState = useAppSelector((state) => state);
  const userId = '73b013c6-371b-4266-b298-0a2ebb265a85';
  return (
    <div tw="text-red-500 text-2xl">
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/purchases">Purchases</Link> |{' '}
      </nav>
      <AddBuyer />
      <br />
      <AddItem />

      <button onClick={() => createPurchase(purchaseState, userId)}>
        Finish
      </button>
    </div>
  );
};

export default App;
