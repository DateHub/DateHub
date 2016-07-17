import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Popup from './Popup' ;
import { Link } from 'react-router';
import Main from './Main';
import * as Actions from '../actions/actionCreators';

// Need to add an import for the location of the dates/events themselves
// import events from './events'
// See below for format of each event
/*
{
    'title': 'Meeting',
    'start': new Date(2015, 3, 12, 10, 30, 0, 0),
    'end': new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
}
*/

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

// Calendar: uses react big calendar api
// Each date will be clickable to show the date list. Each date will have concise info about dates on that day.

export default class Calendar extends Component {
  constructor(props){
    super(props);

    this.state = { 
      current: "",
      open: false,
      events: []
    };
  }

  componentDidMount() {
    return Actions.getEvents()
    .then(function(response) {
      console.log("RESPONSE", response);
      this.setEvents(response.events);
    }.bind(this));
  }

  setEvents(events) {
    console.log(events);
    this.setState({
        current: this.state.current,
        open: this.state.open,
        events: events || []
    });
  }

  open(selectedEvent) {
    this.setState({
      current: selectedEvent,
      open: true,
    });
  }

  render() {
    return (
      <div>
        <BigCalendar
          selectable
          events={this.state.events || []}
          onSelectEvent={event => this.open(event)}
        />
        <Popup value={this.state} />
      </div>
    );
  }
}


