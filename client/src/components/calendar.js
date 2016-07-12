import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Popup from './popup' ;
import { Link } from 'react-router';

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
      open: false
    };
  }

  open(selectedEvent) {
    this.setState({
      current: selectedEvent,
      open: true
    })
  }

  render() {
    // let events = [
    //   {
    //     'title': 'All Day Event',
    //     'allDay': true,
    //     'start': new Date(2015, 3, 0),
    //     'end': new Date(2015, 3, 0)
    //   },
    //   {
    //     'title': 'Long Event',
    //     'start': new Date(2015, 3, 7),
    //     'end': new Date(2015, 3, 10)
    //   },

    //   {
    //     'title': 'DTS STARTS',
    //     'start': new Date(2016, 2, 13, 0, 0, 0),
    //     'end': new Date(2016, 2, 20, 0, 0, 0)
    //   },

    //   {
    //     'title': 'DTS ENDS',
    //     'start': new Date(2016, 10, 6, 0, 0, 0),
    //     'end': new Date(2016, 10, 13, 0, 0, 0)
    //   },

    //   {
    //     'title': 'Some Event',
    //     'start': new Date(2015, 3, 9, 0, 0, 0),
    //     'end': new Date(2015, 3, 9, 0, 0, 0),
    //     desc: 'Most important meal of the day'
    //   },
    //   {
    //     'title': 'Conference',
    //     'start': new Date(2015, 3, 11),
    //     'end': new Date(2015, 3, 13),
    //     desc: 'Big conference for important people'
    //   },
    //   {
    //     'title': 'Meeting',
    //     'start': new Date(2015, 3, 12, 10, 30, 0, 0),
    //     'end': new Date(2015, 3, 12, 12, 30, 0, 0),
    //     desc: 'Pre-meeting meeting, to prepare for the meeting'
    //   },
    //   {
    //     'title': 'Lunch',
    //     'start':new Date(2015, 3, 12, 12, 0, 0, 0),
    //     'end': new Date(2015, 3, 12, 13, 0, 0, 0),
    //     desc: 'Power lunch'
    //   },
    //   {
    //     'title': 'Meeting',
    //     'start':new Date(2015, 3, 12,14, 0, 0, 0),
    //     'end': new Date(2015, 3, 12,15, 0, 0, 0),
    //     desc: 'Most important meal of the day'
    //   },
    //   {
    //     'title': 'Happy Hour',
    //     'start':new Date(2015, 3, 12, 17, 0, 0, 0),
    //     'end': new Date(2015, 3, 12, 17, 30, 0, 0),
    //     desc: 'Most important meal of the day'
    //   },
    //   {
    //     'title': 'Dinner',
    //     'start':new Date(2015, 3, 12, 20, 0, 0, 0),
    //     'end': new Date(2015, 3, 12, 21, 0, 0, 0)
    //   },
    //   {
    //     'title': 'Birthday Party',
    //     'start':new Date(2015, 3, 13, 7, 0, 0),
    //     'end': new Date(2015, 3, 13, 10, 30, 0),
    //     'name': 'nancy',
    //     desc: 'Most important meal of the day'
    //   }
    // ];

    return (
      <div>
        <div style={{ height: 500 }}>
          <BigCalendar
            selectable
            events={events}
            defaultView='month'
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date(2015, 3, 12)}
            onSelectEvent={event => this.open(event)}
          />
          <Popup value={this.state} />
        </div>
      </div>
    );
  }
}


