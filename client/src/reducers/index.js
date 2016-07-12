import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import events from './events';

const rootReducer = combineReducers({events, routing: routerReducer })


export default rootReducer;