import React, { Component } from 'react';
import Modal from 'react-modal';
import DateTimeField from 'react-bootstrap-datetimepicker';
import Moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import * as Actions from '../actions/actionCreators';
import Main from './Main';

// import ReactDOM from 'react-dom';

const customStyles = {
  overlay : {
    backgroundColor   : 'rgba(255, 255, 255, .1)',
    zIndex:  1000
  },
  content : {
    padding               : '0px',
    width                 : '34%',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overflow              : 'hidden'
  }
};

// Calendar: uses react big calendar api
// Each date will be clickable to show the date list. Each date will have concise info about dates on that day.

export default class Popup extends Component {
  constructor(props){
    super(props);

    this.state = { 
      isOpen: this.props.isOpen,
      event: this.props.event,
      closePopup: this.props.popupClose,
      disableDelete: this.props.disableDelete,
      deleteEvent: this.props.deleteEvent
    };

    this.save = this.save.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      event: nextProps.event,
      isOpen: nextProps.isOpen
    });
  }

  save(event) {
    event && event.preventDefault();
    let date = this.refs.date.refs.datetimepicker.firstChild.attributes[2].nodeValue;
    let time = this.refs.time.refs.datetimepicker.firstChild.attributes[2].nodeValue;
    let start = Moment(new Date(date + " " + time)).format();

    let updatedEvent = {
      location: this.refs.location.value || "",
      name: this.refs.name.value || "",
      notes: this.refs.notes.value || "",
      start: start || "",
      end: Moment(start).endOf('day')
    };

    let modal = this;
    let eventId = this.state.event.id;

    // Need to figure out how to re-render

    return this.props.action(updatedEvent, eventId)
    .then(() => {
      this.props.getAllEvents && this.props.getAllEvents();
      return this.state.closePopup();
    });
  }

  handleDelete() {
    if(!this.state.disableDelete) {
      return this.state.deleteEvent(this.state.event.id)
      .then(() => {
        this.props.getAllEvents && this.props.getAllEvents();
          return this.state.closePopup()
      });
    };
  }

  render() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        style={customStyles}>
        <form className="eventEditor" onSubmit={this.save.bind(this)}>
          <div className="panel panel-primary no-margin">
            <div className="panel-heading">
              <h1 className="center-text">Date Info</h1>
              <button className="btn btn-danger close-button" type="button"
                      onClick={this.state.closePopup}>X</button>
            </div>
            <div className="panel-body">
              <div className="form-group form-padding">
                <div className="row">
                  <div className="col-md-6">
                    <DateTimeField mode="date" dateTime={Moment(this.state.event.start).toDate()} ref="date"/>
                  </div>
                  <div className="col-md-6">
                    <DateTimeField mode="time" dateTime={Moment(this.state.event.start).toDate()} ref="time" />
                  </div>
                </div>
                <input className="form-control" type="text" defaultValue={this.state.event.name} placeholder="Enter a name" ref="name"/>
                <input className="form-control" type="text" defaultValue={this.state.event.location} placeholder="Enter a location" ref="location"/>
                <input className="form-control" type="text" defaultValue={this.state.event.notes} placeholder="Notes/description" ref="notes"/>
              </div>
            </div>
            <div className="panel-footer primary center-text">
              <div className="row">
                <div className="col-md-6">
                  <button disabled={this.state.disableDelete} className="btn btn-danger full-width" type="button" onClick={this.handleDelete}>Delete</button>
                </div>
                <div className="col-md-6">
                  <button className="saveEvent btn btn-success full-width" type="submit">Save</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}