import React, { Component } from 'react';
import Modal from 'react-modal';
import NotificationUpcomingDate from './NotificationUpcomingDate'

// Notification: this component will contain notifications that users needs to check; there are two types of notifications; informing upcoming date and reminding to leave a review on a person who a user met recently. This does not include specific information. It will only display if upcoming Date or review exist or not.

// Display: "You have upcoming date tomorrow", "You have ## dates that you have not left reviews"

// Functionality: Displaying notifications with buttons; one for upcoming date and another one for review to leave

const customStyles = {
  overlay : {
    backgroundColor   : 'rgba(255, 255, 255, .1)',
    zIndex:  900
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

export default class Notification extends Component {
  constructor(props){
    super(props);

    this.state = {
      notificationOpen: this.props.value.notificationOpen,
      matches: this.props.value.newMatches || []
    };

    this.openNotification = this.openNotification.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      notificationOpen: nextProps.value.notificationOpen,
      matches: nextProps.value.newMatches || []
    });
  }

  openNotification() {
    this.setState({
      notificationOpen: true
    });
  }

  closeNotification() {
    this.setState({
      notificationOpen: false
    });
  }

  render() {
    return (
        <Modal
          isOpen={this.state.notificationOpen}
          onRequestClose={this.closeNotification}
          style={customStyles}>
          <NotificationUpcomingDate matches={this.state.matches} hasMatches={this.state.matches.length !== 0} />
        </Modal>
    );
  }
};