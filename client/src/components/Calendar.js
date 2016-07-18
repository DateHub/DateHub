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

var lastLength = -1;
var loading = false;

export default class Calendar extends Component {
  constructor(props){
    super(props);

    this.state = { 
      current: "",
      open: false,
      events: [],
      props: this.props
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.events.events === undefined && !loading) {
      loading = true;
      return this.getAllEvents();
    }
    if(nextProps.events.events === undefined && loading) {
      return;
    }
    if(loading) {
      loading = false;
      lastLength = nextProps.events.events.length;
    }

    if(lastLength !== nextProps.events.events.length) {
      lastLength = nextProps.events.events.length;
      this.setState({ 
        events: nextProps.events.events,
        current: this.state.current,
        open: false
      })
    }
  }

  getAllEvents() {
    return this.props.getEvents()
    .then(() => {
      return this.setState({ 
        events: this.props.events.events,
        current: this.state.current,
        open: false
      })
    });
  }

  setEvents(events) {
    this.setState({
        current: this.state.current,
        open: this.state.open,
        events: this.props.events
    });
  }

  open(selectedEvent) {
    this.setState({
      current: selectedEvent,
      open: true,
    });
  }

  popupClose() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div>
        <BigCalendar
          selectable
          events={this.state.events}
          onSelectEvent={event => this.open(event)}
        />
        <Popup isOpen={this.state.open}
               popupClose={this.popupClose.bind(this)}
               event={this.state.current} 
               action={this.props.editEvent} />
      </div>
    );
  }
}


