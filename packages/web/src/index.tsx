import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles/GlobalStyles';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Purchase from './routes/purchase';
import store from './app/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Calculation from './routes/calculation';

const Root: React.FunctionComponent = (): JSX.Element => {
  let persistor = persistStore(store);

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalStyles />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/purchases/:purchaseId" element={<Purchase />} />
              <Route
                path="/purchases/:purchaseId/calc"
                element={<Calculation />}
              />
            </Routes>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// /purchases/purchaseId
// /purchases/purchaseId/purchasers /purchasers
// /purchases/purchaseId/items/add
