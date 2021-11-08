import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles/GlobalStyles';

import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';

const Root: React.FunctionComponent = (): JSX.Element => {
  return (
    <>
      <Provider store={store}>
        <GlobalStyles />
        <App />
      </Provider>
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
