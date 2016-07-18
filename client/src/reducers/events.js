// reducers take in two arguments:

// 1. the action (what happened)
// 2. a copy of the current state

function events(state = [], action) {
  switch(action.type) {
    case 'GET_EVENTS' :
      return {
        events: action.events
      };

    case 'ADD_EVENT' :
      return [...state, {
        title: "test title",
        name: action.event.name,
        location: action.event.location,
        start: action.event.date,
        end: action.event.end,
        notes: action.event.notes
      }];

    case 'EDIT_EVENT' :
      let index = null

      for(let i = 0; i < state.events.length; i++) {
        if(state.events[i].id === action.eventId) {
          index = i;
          break;
        }
      }

      // index of event as it's stored in the DB
      return [
        // from start of index to the event that we're deleting
        ...state.events.slice(0, index),
        // the item
        {...state[index], event: {
          name: action.event.name,
          location: action.event.location,
          start: action.event.start,
          end: action.event.end,
          notes: action.event.notes
        }},
        // index after item
        ...state.events.slice(index + 1)
      ];

    case 'DELETE_EVENT' :
      index = null;
      for(let i = 0; i < state.events.length; i++) {
        if(state.events[i].id === action.eventId) {
          index = i;
          break;
        }
      }

      return [
        // from start of index to the event that we're deleting
        ...state.events.slice(0, index),
        // the next event after the one that we've deleted
        ...state.events.slice(index + 1)
      ];

    default:
      return state;
  }
}

export default events;