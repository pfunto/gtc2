import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles/GlobalStyles';

import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { UserContextProvider } from './components/Authentication/UserContext';

const Root: React.FunctionComponent = (): JSX.Element => {
  let persistor = persistStore(store);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <UserContextProvider>
            <GlobalStyles />
            <App />
          </UserContextProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// /purchases/purchaseId
// /purchases/purchaseId/buyers /buyers
// /purchases/purchaseId/items/add
