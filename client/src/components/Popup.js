import React, { Component } from 'react';
import Modal from 'react-modal';
import DateTimeField from 'react-bootstrap-datetimepicker';
import Moment from 'moment';
import axios from 'axios';

// import ReactDOM from 'react-dom';

// // Need to add an import for the location of the dates/events themselves
// // import events from './events'
// // See below for format of each event

// {
//     'title': 'Meeting',
//     'start': new Date(2015, 3, 12, 10, 30, 0, 0),
//     'end': new Date(2015, 3, 12, 12, 30, 0, 0),
//     desc: 'Pre-meeting meeting, to prepare for the meeting'
// }


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

// Calendar: cuses react big calendar api
// Each date will be clickable to show the date list. Each date will have concise info about dates on that day.

export default class Popup extends Component {
  constructor(props){
    super(props);

    this.state = { 
      modalIsOpen: this.props.value.open,
      event: this.props.value.current
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      event: nextProps.value.current,
      modalIsOpen: nextProps.value.open
    });
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  afterOpenModal() {
    // Nothing to do
  }

  closeModal(event) {
    event && event.preventDefault();
    this.setState({
      modalIsOpen: false
    });
  }

  save(event) {
    event && event.preventDefault();
    let date = this.refs.date.refs.datetimepicker.firstChild.attributes[2].nodeValue;
    let time = this.refs.time.refs.datetimepicker.firstChild.attributes[2].nodeValue;
    let start = Moment(date + " " + time, "MM/DD/YYYY hh:mm A").toDate();
    let updatedEvent = {
      location: this.refs.location.value || "",
      name: this.refs.name.value || "",
      notes: this.refs.notes.value || "",
      date: start || ""
    };
    let modal = this;

    axios.post('/api/dates', updatedEvent)
    .then((response) => {
      modal.closeModal();
    })
    .catch((error) => {
      alert(error);
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}>
        <form className="eventEditor">
          <div className="panel panel-primary no-margin">
            <div className="panel-heading subtitle">
              <h1 className="center-text">Date Info</h1>
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
                  <button className="btn btn-danger full-width" onClick={this.closeModal}>Close</button>
                </div>
                <div className="col-md-6">
                  <button className="saveEvent btn btn-success full-width" onClick={this.save}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}