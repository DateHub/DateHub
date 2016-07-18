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
      isOpen: this.props.isOpen,
      matches: this.props.newMatches || [],
      popupOpen: this.props.popupOpen,
      notificationClose: this.props.notificationClose
    };
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      isOpen: nextProps.isOpen,
      matches: nextProps.newMatches || []
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-header">
            <div className="navbar-brand">
              <img alt="DateHub" src=""/>
            </div>
          </div>
          <Link to="/dates" className="btn btn-primary navbar-btn pull-right margin-sides-small"> 
            Dates <span className="badge">{this.props.events.events && this.props.events.events.length || 0}</span>
          </Link>
          <button className="btn btn-primary navbar-btn pull-right margin-sides-small" 
                  type="button"
                  data-toggle="popover" 
                  onClick={this.notificationOpen.bind(this)}>
            <Loading isLoading={this.state.isLoading}
                     newMatches={this.state.newMatches} />
          </button>
        </nav>
        <Notification isOpen={this.state.notificationOpen} 
                      newMatches={this.state.newMatches}
                      notificationClose={this.notificationClose.bind(this)}
                      popupOpen={this.popupOpen.bind(this)}/>
        <Popup isOpen={this.state.popupOpen}
               popupClose={this.popupClose.bind(this)}
               event={this.state.event} 
               action={this.props.addEvent}
               getAllEvents={this.props.getEvents} />
        <Notification value={this.state} newMatches={this.props.newMatches.bind(this)}/>
        {React.cloneElement(this.props.children, this.props)}
      </div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.state.notificationClose}
          style={customStyles}>
          <NotificationUpcomingDate 
            matches={this.state.matches} 
            hasMatches={this.state.matches.length !== 0}
            popupOpen={this.state.popupOpen} />
        </Modal>
    );
  }
};