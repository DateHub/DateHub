import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Notification from './Notification';
import Loading from './Loading';
import Popup from './Popup';

export default class Main extends Component {
  constructor(props){
    super(props);

    this.state = { 
      notificationOpen: false,
      popupOpen: false,
      event: '',
      newMatches: [],
      auth: this.props.auth,
      isLoading: false
    };
  }

  componentDidMount() {
    axios.get('/api/matches/dateless')
      .then(results => {
        this.setState({
          newMatches: results.data || []
        })
      })
      .catch(error => {
        console.log(error);
      });

    (function getNewMatches(context) {
      let halfHour = 30 * 60 * 1000;
      context.setState({
        isLoading: true
      })
      axios.get('/api/matches/new')
      .then(results => {
        context.setState({
          isLoading: false,
          newMatches: context.state.newMatches.concat(results.data)
        });
        setTimeout(function() {
          return getNewMatches(context);
        }, halfHour);
      })
      .catch(error => {
        console.log(error);
      });
    })(this);
  }

  notificationOpen(selectedEvent) {
    this.setState({
      notificationOpen: !this.state.notificationOpen,
      popupOpen: false
    });
  }

  notificationClose() {
    this.setState({
      notificationOpen: false
    });
  }

  popupOpen(matchedPerson) {
    this.setState({
      popupOpen: true,
      event: matchedPerson
    });
  }

  popupClose() {
    this.setState({
      popupOpen: false
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
          <Link to="/" className="btn btn-primary navbar-btn pull-right margin-sides-small">
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
               disableDelete={true}
               getAllEvents={this.props.getEvents} />
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}