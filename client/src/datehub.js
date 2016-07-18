import React, { Component } from 'react';

import ReactDOM from 'react-dom';

// Import components
import App from './components/App';
import Calendar from './components/Calendar';
import DateList from './components/DateList';
import Login from './components/Login';
import Notification from './components/Notification';
import NotificationReview from './components/NotificationReview';
import NotifcationUpcomingDate from './components/NotificationUpcomingDate';
import Popup from './components/Popup';

// Import react router dependencies
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history, defaultState } from './store';

function requireAuth(nextState, replace) {
  // Need to figure out to update auth status
  // console.log("in requireAuth", store.getState().auth);
  // if(!store.getState().auth) {
  //   replace('/login');
  // }
}

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Calendar} onEnter={requireAuth} />
        <Route path='login' component={Login} />
        <Route path='dates' component={DateList} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(router, document.getElementById('container'));