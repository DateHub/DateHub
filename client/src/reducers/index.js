import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import changeEvents from './events';

const rootReducer = combineReducers({changeEvents, routing: routerReducer })


export default rootReducer;