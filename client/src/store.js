import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from  'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducers
import rootReducer from './reducers/index';

// TODO: import events from database
// import events from '.*';

// create an obj for the default data

let events = [{name: "Nancy", title: "Date with" + name, location: "Disneyland", start: new Date(2016, 6, 12, 10, 30, 0, 0), end: new Date(2016, 6, 12, 12, 30, 0, 0), notes: "She seems like a nice lady!"}, {name: "Mary-Jane", title: "Date with" + name, location: "Las Vegas", start: new Date(2016, 6, 18, 10, 30, 0, 0), end: new Date(2016, 6, 18, 12, 30, 0, 0), notes: "She seems like a nice lady too"}]

const defaultState = {
  events: events
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
