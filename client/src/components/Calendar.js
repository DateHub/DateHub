import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import Popup from './Popup' ;
import { Link } from 'react-router';
import Main from './Main';
import * as Actions from '../actions/actionCreators';
import DateTimeField from 'react-bootstrap-datetimepicker';
import { connect } from 'react-redux';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(Moment)
);

// Calendar: uses react big calendar api
// Each date will be clickable to show the date list. Each date will have concise info about dates on that day.

export default class Calendar extends Component {
  constructor(props){
    super(props);

    this.state = { 
      current: "",
      open: false,
      events: this.props.events
    };
  }

  componentDidMount() {
    return Actions.getEvents()
    .then(() => {
      console.log(this.props.events);
    });
  }

  componentWillReceiveProps() {
    return this.getAllEvents();
  }

  getAllEvents() {
    return Actions.getEvents()
    .then((response) => {
      return this.setEvents(response.events);
    });
  }

  setEvents(events) {
    this.setState({
        current: this.state.current,
        open: this.state.open,
        events: events
    });
  }

  createEvent(event) {
    // Need to make a button and modal to deal with this, but the addEvent function works perfectly

    event.preventDefault();

    let end = Moment(this.refs.start.value).endOf('day').format();

    let newEvent = {
      // title: title,
      location: this.refs.location.value || "",
      name: this.refs.name.value || "",
      // notes: this.refs.notes.value || "",
      start: this.refs.start.value || "",
      end: end
    };

    return Actions.addEvent(newEvent)
    .then(() => {
      return this.getAllEvents();
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
          events={this.state.events}
          onSelectEvent={event => this.open(event)}
          views={["month"]}
        />
        <Popup value={this.state} />
        <form onSubmit={this.createEvent.bind(this)}>
          <input type="text" ref="name"/>
          <input type="text" ref="location"/>
          <input type="datetime-local" ref="start"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}


