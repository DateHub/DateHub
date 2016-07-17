import React, { Component } from 'react';
import { Link } from 'react-router';
import Notification from './Notification';

export default class Main extends Component {
  constructor(props){
    super(props);

    this.state = { 
      notificationOpen: false
    };
  }

  notificationOpen(selectedEvent) {
    this.setState({
      notificationOpen: true,
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
          <Link to="/api/dates" className="btn btn-primary navbar-btn pull-right margin-sides-small"> 
            Dates <span className="badge">5</span>
          </Link>
          <button className="btn btn-primary navbar-btn pull-right margin-sides-small" 
                  type="button"
                  onClick={this.notificationOpen.bind(this)}>
            <span className="glyphicon glyphicon-heart margin-sides-small" aria-hidden="true"></span>  
            <span className="badge">4</span>
          </button>
        </nav>
        <Notification value={this.state}/>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}