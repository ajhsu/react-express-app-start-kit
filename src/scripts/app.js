import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import AppContainer from 'views/app-container.js';
import testReducer from './reducers/test-reducer';

const store = createStore(testReducer);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('universe')
);
