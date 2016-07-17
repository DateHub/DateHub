import React from 'react';
import Main from './Main';
import { Link } from 'react-router';
import { Media, MediaBody, MediaHeading, MediaLeft, MediaList, MediaListItem, MediaRight } from 'react-bootstrap'; 

//DateList: When a specific date is clicked on calendar, this component will display the list of dates a user will have on that day.

let events = [{name: "Nancy", title: "Date with" + name, location: "Disneyland", start: new Date(2016, 6, 12, 10, 30, 0, 0), end: new Date(2016, 6, 12, 12, 30, 0, 0), notes: "She seems like a nice lady!"}, {name: "Mary-Jane", title: "Date with" + name, location: "Las Vegas", start: new Date(2016, 6, 18, 10, 30, 0, 0), end: new Date(2016, 6, 18, 12, 30, 0, 0), notes: "She seems like a nice lady too"}];

const DateList = React.createClass({
  renderEvent(event, i){
    return (
      <div className="event" key={i}>
        <Media>
          <Media.Left>
            <img width={128} height={128} src="http://i758.photobucket.com/albums/xx223/r0bz0mbie/thumbnail-1.jpg" alt="Image"/>
          </Media.Left>
          <Media.Body>
            <Media.Heading>Date with {event.name}</Media.Heading>
            <h5>at {event.location}</h5>
            <h5>{event.notes}</h5>
          </Media.Body>
        </Media>
      </div>
    );
  },

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
            Calendar
          </Link>
        </nav>
        <div className="dates">
          {events.map(this.renderEvent)}
        </div>
      </div>
    );
  }
});

export default DateList;