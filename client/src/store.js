import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from  'react-router-redux';
import { browserHistory } from 'react-router';
import syncRequest from 'sync-request';
import thunk from 'redux-thunk';

// import the root reducers
import rootReducer from './reducers/index';

import axios from 'axios';

const store = applyMiddleware(thunk)(createStore)(rootReducer);

export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
