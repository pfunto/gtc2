import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles/GlobalStyles';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Purchasers from './routes/purchasers';
import store from './app/store';
import { Provider } from 'react-redux';

const Root: React.FunctionComponent = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/purchases/:purchaseId" element={<Purchasers />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// /purchases/purchaseId
// /purchases/purchaseId/purchasers /purchasers
// /purchases/purchaseId/items/add
