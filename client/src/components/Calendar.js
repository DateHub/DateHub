import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Popup from './Popup' ;
import { Link } from 'react-router';
import Main from './Main';

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
    };
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
        <div style={{ height: 500 }}>
          <BigCalendar
            selectable
            events={this.props.events}
            onSelectEvent={event => this.open(event)}
          />
          <Popup value={this.state} />
        </div>
      </div>
    );
  }
}


