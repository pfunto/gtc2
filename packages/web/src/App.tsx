import 'twin.macro';
import 'styled-components/macro';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import CalculationForm from './modules/CalculationForm';
import Login from './components/Authentication/Login';
import Home from './components/ui/Home';
import SignUp from './components/Authentication/SignUp';
import Navbar from './components/ui/Navbar';
<<<<<<< HEAD
import { useAppDispatch, useAppSelector } from './app/hooks';
=======
import { useAppSelector } from './app/hooks';
>>>>>>> master

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from './firebase';
import { setAuthState } from './components/Authentication/authSlice';
import { createUser, getUser } from './services/AuthService';

const App = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const auth = getAuth(firebase);
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser && !isLoggedIn) {
      const token = await firebaseUser.getIdToken();

      console.log('firebaseUser', firebaseUser);

      let user = await getUser(firebaseUser, token);
      console.log('user', user);
      if (!user) {
        user = await createUser(firebaseUser, token);
      }

      localStorage.setItem('token', token);
      dispatch(setAuthState(user));
    }
  });

  const AuthRoutes = () => (
    <div tw="w-full px-4">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );

  const AppRoutes = () => (
    <>
      <Navbar />

      <div tw="w-full px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="purchases/:purchaseId" element={<Receipt />} /> */}
          <Route
            path="purchases/:purchaseId/edit"
            element={<CalculationForm />}
          />
          <Route
            path="purchases/create-purchase"
            element={<CalculationForm />}
          />
        </Routes>
      </div>
    </>
  );

  return (
    <BrowserRouter>{isLoggedIn ? AppRoutes() : AuthRoutes()}</BrowserRouter>
  );
};

export default App;
