// Store/configureStore.js

import { createStore, combineReducers } from 'redux';
import getDestination from './Reducers/getDestination'
import getUserStatus from './Reducers/getUserStatus'

const reducer = combineReducers({
    destination: getDestination,
    userStatus: getUserStatus
})

export default createStore(reducer);

