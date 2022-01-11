import 'twin.macro';
import 'styled-components/macro';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
// import { useAppSelector } from './app/hooks';

import Purchase from './routes/purchase';
import CalculationForm from './modules/CalculationForm';
import { useState } from 'react';
import firebase from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './components/Authentication/Login';
import Home from './components/ui/Home';
import SignUp from './components/Authentication/SignUp';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const purchaseState = useAppSelector((state) => state);
  // const userId = '73b013c6-371b-4266-b298-0a2ebb265a85';

  const auth = getAuth(firebase);
  onAuthStateChanged(auth, (user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    // probably new operations here to handle ids between firebase and db
  });

  console.log(`isLoggedIn`, isLoggedIn);

  const AuthRoutes = () => (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Login />} />
      {/* register */}
    </Routes>
  );

  const AppRoutes = () => (
    <Routes>
      {/* home wil have purchases history list, create purchase button, nav bar */}
      <Route path="/" element={<Home />} />
      <Route path="purchases/:purchaseId" element={<Purchase />} />
      <Route path="purchases/create-purchase" element={<CalculationForm />} />
      {/* receipt */}
    </Routes>
  );

  return (
    <>
      <BrowserRouter>{isLoggedIn ? AppRoutes() : AuthRoutes()}</BrowserRouter>
    </>
  );
};

export default App;
