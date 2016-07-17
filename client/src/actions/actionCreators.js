import axios from 'axios';

// get events
export function getEvents() {
  let Today = new Date();
  let month = Today.getMonth() + 1;
  let year = Today.getYear();
  return axios.get('/api/dates/month/' + month + '/year/' +year)
  .then((response) => {
    return {
      type: 'GET_EVENTS',
      events: response.data
    }
  })
  .catch((error) => {
    console.log(error);
  });
}

// add event
export function addEvent(eventObject) {
  return axios.post('/api/dates', eventObject)
    .then((response) => {
      return {
        type: 'NEW_EVENT',
        event: eventObject
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// edit event
export function editEvent(eventObject, eventId) {
  return {
    type: 'EDIT_EVENT',
    event: eventObject,
    eventId: eventId
  }
}

// delete event
export function deleteEvent(eventId) {
  return axios.delete('/api/dates/' + eventId)
  .then((response) => {
    return {
      type: 'DELETE_EVENT',
      eventId: eventId
    }
  })
  .catch((error) => {
    console.log(error);
  });
}

// facebook/tinder login
export function tinderLogin(token) {
  return axios.post('/auth/tinder', {
      facebook_token: token
    })
    .then((response) => {
      console.log("tinder login", response);
      return {
        type: 'LOGIN',
        auth: true
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
