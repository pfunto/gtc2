import 'twin.macro';
import 'styled-components/macro';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import CalculationForm from './modules/CalculationForm';
import Login from './components/Authentication/Login';
import Home from './components/ui/Home';
import SignUp from './components/Authentication/SignUp';
import Navbar from './components/ui/Navbar';
import { useAppSelector } from './app/hooks';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from './firebase';
import { createToken } from './services/AuthService';
import api from './app/api';

const App = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const auth = getAuth(firebase);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const headers = await createToken(user);

      api.interceptors.request.use((config) => {
        config.headers = headers;
        return config;
      });
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
