// reducers take in two arguments:

// 1. the action (what happened)
// 2. a copy of the current state

function auth(state = {}, action) {
  switch(action.type) {
    case 'LOGIN' :
      return {
        facebook_token: action.facebook_token,
        auth: action.auth
      };

    case 'GET_MATCHES' :
      return {
        matches: action
      };

    default:
      return state;
  }
}

export default auth;