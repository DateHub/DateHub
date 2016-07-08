import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login';
import DateList from './components/date_list';
import Calendar from './components/calendar';
import Notification from './components/notification';
import Notification_upcomingDate from './components/notification_upcomingDate';
import Notification_review from './components/notification_review';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = { 
      
    };
  }

  render(){
    return (
      <div>
        <Login />
        <DateList />
        <Calendar />
        <Notification />
        <Notification_upcomingDate />
        <Notification_review />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('container'));
