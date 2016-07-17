import axios from 'axios';

// get events
export function getEvents() {
  return axios.get('/api/dates/month/07/year/2016')
  .then(function(response) {
    console.log(response);
    return {
      type: 'GET_EVENTS',
      events: response.data
    }
  });
}

// add event
export function addEvent(eventObject) {
  return {
    type: 'NEW_EVENT',
    event: eventObject
  }
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
  return {
    type: 'DELETE_EVENT',
    eventId: eventId
  }
}
