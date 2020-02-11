// Store/configureStore.js

import { createStore } from 'redux';
import getDestination from './Reducers/getDestination'
export default createStore(getDestination)