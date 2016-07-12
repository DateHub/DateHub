// add event
function addEvent(eventObject) {
  return {
    type: 'NEW_EVENT',
    event: eventObject
  }
}

// edit event
function editEvent(eventObject, eventId) {
  return {
    type: 'EDIT_EVENT',
    event: eventObject,
    eventId: eventId
  }
}

// delete event
function deleteEvent(eventId) {
  return {
    type: 'DELETE_EVENT',
    eventId: eventId
  }
}
