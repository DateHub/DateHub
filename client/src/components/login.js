import React, { Component } from 'react';
import axios from 'axios';

// This component will get the user id and user password with authentication feature.

export default class Login extends Component {
  constructor(props){
    super(props);

    // TODO: Grab user ID and user password
    this.state = { 
      facebookToken: ''
    };

    this.login = function() {
      return axios.post('/auth/tinder', {
        facebook_token: this.state.facebookToken
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }.bind(this);

    this.handleChange = function(event) {
      this.setState({facebookToken: event.target.value});
    }.bind(this);
  }

  // TODO: Fill out the 'input' DOM elements for an user ID and a password. Add a login button. (Sign up button might need - discuss)

  render(){
    return (
      <div>
        <div>
          <a target="_blank"
             href="https://chrome.google.com/webstore/detail/tinder-auth-token-grabber/pgjknpecbogfcnlfjehdidbeablebepc?utm_source=gmail">
            Install this plugin to make life easier
          </a>
        </div>
        <div>
          <a href="https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=basic_info,email,public_profile,user_about_me,user_activities,user_birthday,user_education_history,user_friends,user_interests,user_likes,user_location,user_photos,user_relationship_details&response_type=token">
            Generate access token
          </a>
        </div>
        <input
          type="text"
          value={this.state.facebookToken}
          onChange={this.handleChange}
          placeholder="Enter access token" />
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}