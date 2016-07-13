import React, { Component } from 'react';
import Modal from 'react-modal';
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
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
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
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal(event) {
    event.preventDefault();
    this.setState({
      modalIsOpen: false
    });
  }

  save(event) {
    event.preventDefault();

    let updatedEvent = {
      location: this.refs.location || "",
      name: this.refs.name || "",
      notes: this.refs.notes || "",
      start: this.refs.start || "",
      end: this.refs.end || ""
    };

    this.closeModal();

    /* TODO: someHelperFunction.axios(event) => {
        should send events to helper function which updates the db

      } */

  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}>
          <h2 ref="subtitle">Date Info</h2>
          <form className="eventEditor">
            <button className="saveEvent" type="submit" onSubmit={this.save}>Save</button>
            <button onClick={this.closeModal}>Close</button>
            <input type="datetime" defaultValue={this.state.event.start} placeholder="Enter a start time" ref="start"/>
            <input type="text" defaultValue={this.state.event.name} placeholder="Enter a name" ref="name"/>
            <input type="text" defaultValue={this.state.event.location} placeholder="Enter a location" ref="location"/>
            <input type="text" defaultValue={this.state.event.notes} placeholder="Notes/description" ref="notes"/>
          </form>
        </Modal>
      </div>
    );
  }
}