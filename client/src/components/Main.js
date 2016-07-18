import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Notification from './Notification';

export default class Main extends Component {
  constructor(props){
    super(props);
    console.log("PROPS", this.props);

    this.state = { 
      notificationOpen: false,
      newMatches: [],
      auth: this.props.auth
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
      axios.get('/api/matches/new')
      .then(results => {
        context.setState({
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
          <Link to="/dates" className="btn btn-primary navbar-btn pull-right margin-sides-small"> 
            Dates <span className="badge">5</span>
          </Link>
          <button className="btn btn-primary navbar-btn pull-right margin-sides-small" 
                  type="button"
                  data-toggle="popover" 
                  onClick={this.notificationOpen.bind(this)}>
            <span className="glyphicon glyphicon-heart margin-sides-small" aria-hidden="true"></span>  
            <span className="badge">{this.state.newMatches.length}</span>
          </button>
        </nav>
        <Notification value={this.state}/>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}