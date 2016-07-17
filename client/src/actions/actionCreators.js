import axios from 'axios';

// get events
export function getEvents() {
  return axios.get('/api/dates/month/07/year/2016')
  .then((response) => {
    console.log("getting action events", response);
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
