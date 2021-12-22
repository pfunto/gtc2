import 'twin.macro';
import 'styled-components/macro';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
// import { useAppSelector } from './app/hooks';

// import ky from 'ky';
// import { PurchaseState } from './app/store';
import Purchase from './routes/purchase';
import CalculationForm from './modules/CalculationForm';
import { useState } from 'react';
import firebase from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// async function createPurchase(purchaseState: PurchaseState, userId: string) {
//   const purchase = await ky.post('http://localhost:8888/api/purchases', {
//     json: { state: purchaseState, userId: userId },
//   });
//   console.log('purchase', purchase);
//   return purchase;
// }

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const purchaseState = useAppSelector((state) => state);
  // const userId = '73b013c6-371b-4266-b298-0a2ebb265a85';

  const auth = getAuth(firebase);
  onAuthStateChanged(auth, (user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  console.log(`isLoggedIn`, isLoggedIn);

  const AuthRoutes = () => (
    <Routes>
      <Route path="/" element={<CalculationForm />} />
    </Routes>
  );

  const AppRoutes = () => (
    <Routes>
      <Route path="purchases/:purchaseId" element={<Purchase />} />
      <Route path="purchases/create-purchase" element={<CalculationForm />} />
    </Routes>
  );

  return (
    <>
      <BrowserRouter>{isLoggedIn ? AppRoutes() : AuthRoutes()}</BrowserRouter>

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
