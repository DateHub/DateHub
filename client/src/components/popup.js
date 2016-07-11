import React, { Component } from 'react';
// import BigCalendar from 'react-big-calendar';
// import moment from 'moment';
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


// BigCalendar.setLocalizer(
//   BigCalendar.momentLocalizer(moment)
// );

const customStyles = {
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

    console.log(this.props.value);

    this.state = { 
      modalIsOpen: this.props.value.open,
      event: this.props.value.current
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount(){
    this.setState({
      event: this.props.value
    });
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

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2 ref="subtitle">Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>Date</div>
          <div>{this.state.event.name}</div>
          <div>{this.state.event.title}</div>
          <form>
            <input />
          </form>
        </Modal>
      </div>
      
    );
  }
}

            // <div>{this.state.event.start}</div>
            // <div>{this.state.event.end}</div>
