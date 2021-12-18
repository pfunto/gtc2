import 'twin.macro';
import 'styled-components/macro';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
// import { useAppSelector } from './app/hooks';

// import ky from 'ky';
// import { PurchaseState } from './app/store';
// import StepNav from './components/ui/StepNav';
import Purchase from './routes/purchase';
import CalculationForm from './modules/CalculationForm';

// async function createPurchase(purchaseState: PurchaseState, userId: string) {
//   const purchase = await ky.post('http://localhost:8888/api/purchases', {
//     json: { state: purchaseState, userId: userId },
//   });
//   console.log('purchase', purchase);
//   return purchase;
// }

const App = () => {
  // const purchaseState = useAppSelector((state) => state);
  // const userId = '73b013c6-371b-4266-b298-0a2ebb265a85';
  return (
    <>
      <BrowserRouter>
        {/* <StepNav /> */}
        <Routes>
          <Route path="/">create purchase, home</Route>
          <Route path="purchases/:purchaseId" element={<Purchase />} />
          <Route
            path="purchases/create-purchase"
            element={<CalculationForm />}
          />
        </Routes>
      </BrowserRouter>

      {/* <div tw="text-red-500 text-2xl">
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
      </div> */}
    </>
  );
};

export default App;
