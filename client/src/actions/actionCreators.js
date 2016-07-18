import axios from 'axios';

// get events
export function getEvents() {
  let Today = new Date();
  let month = Today.getMonth() + 1;
  let year = 2016;

  if(month < 10) {
    month = "0" + month
  }

  const loadEvents = axios.get('/api/dates/month/' + month + '/year/' + year)

  return (dispatch) => {
    return loadEvents.then(({data}) => {
      dispatch({
        type: 'GET_EVENTS',
        events: data
      })
    });
  };
}

// add event
export function addEvent(eventObject) {

  const newEvent = axios.post('/api/dates', eventObject);

  return (dispatch) => {
    return newEvent.then(({data}) => {
      dispatch({
        type: 'NEW_EVENT',
        event: eventObject
      })
    });
  };
}

// edit event
export function editEvent(updatedEvent, eventId) {

  const changeEvent = axios.put('/api/dates/' + eventId, updatedEvent);

  return (dispatch) => { 
    return changeEvent.then(({data}) => {
      dispatch({
        type: 'EDIT_EVENT',
        event: updatedEvent,
        eventId: eventId
      })
    });
  };
}

// delete event
export function deleteEvent(eventId) {

  const deleteEvt = axios.delete('/api/dates/' + eventId);
  
  return (dispatch) => {
    return deleteEvt.then(({data}) => {
      dispatch({
        type: 'DELETE_EVENT',
        eventId: eventId
      })
    }).catch((error) => {
      console.log(error);
    });
  };
}

// facebook/tinder login
export function tinderLogin(token) {
  const login = axios.post('/auth/tinder', {
      facebook_token: token
  });

  return (dispatch) => {
    return login.then(({data}) => {
      console.log(data);
      dispatch ({
        type: 'LOGIN',
        facebook_token: token,
        auth: true
      })
    }).catch((error) => {
      console.log(error);
    });
  };
}
