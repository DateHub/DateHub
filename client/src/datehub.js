import React, { Component } from 'react';

import ReactDOM from 'react-dom';

// Import components
import App from './components/app';
import Calendar from './components/calendar';
import DateList from './components/date_list';
import Login from './components/login';
import Notification from './components/notification';
import NotificationReview from './components/notification_review';
import NotifcationUpcomingDate from './components/notification_upcomingDate';
import Popup from './components/popup'

// Import react router dependencies
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store'

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Calendar}></IndexRoute>
        <Route path='/api/datelist' component={DateList}></Route>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(router, document.getElementById('container'));