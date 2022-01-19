import 'twin.macro';
import 'styled-components/macro';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import CalculationForm from './modules/CalculationForm';
import Login from './components/Authentication/Login';
import Home from './components/ui/Home';
import SignUp from './components/Authentication/SignUp';
import Navbar from './components/ui/Navbar';
import { useAppSelector } from './app/hooks';

const App = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const AuthRoutes = () => (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );

  const AppRoutes = () => (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="purchases/edit/:purchaseId"
          element={<CalculationForm />}
        />
        <Route path="purchases/create-purchase" element={<CalculationForm />} />
      </Routes>
    </>
  );

  return (
    <BrowserRouter>{isLoggedIn ? AppRoutes() : AuthRoutes()}</BrowserRouter>
  );
};

export default App;
