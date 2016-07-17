// reducers take in two arguments:

// 1. the action (what happened)
// 2. a copy of the current state

function events(state = [], action) {
  switch(action.type) {
    case 'GET_EVENTS' :
      console.log("Getting events!");
      return [...state, {
        events: action.events
      }];

    case 'ADD_EVENT' :
      // TODO: get ID of event after it's added to DB
      console.log("Adding new event!");
      return [...state, {
        name: action.event.name,
        location: action.event.location,
        start: action.event.start,
        end: action.event.end,
        notes: action.event.notes
      }];

    case 'EDIT_EVENT' :
      console.log("Editing and saving event!");
      // index of event as it's stored in the DB
      const i = action.index;
      return [
        // from start of index to the event that we're deleting
        ...state.slice(0, i),
        // the item
        {...state[i], event: {
          name: action.event.name,
          location: action.event.location,
          start: action.event.start,
          end: action.event.end,
          notes: action.event.notes
        }},
        // index after item
        ...state.slice(i + 1)
      ];

    case 'DELETE_EVENT' :
      console.log("Editing and saving event!");
      return [
        // from start of index to the event that we're deleting
        ...state.slice(0, i),
        // the next event after the one that we've deleted
        ...state.slice(i + 1)
      ];

    default:
      return state;
  }
}

export default events;