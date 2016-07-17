import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import events from './events';
import auth from './auth';

const rootReducer = combineReducers({events, auth, routing: routerReducer })


export default rootReducer;