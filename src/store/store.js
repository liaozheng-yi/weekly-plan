import plans from './reducers/reducer.plans.js';
import {createStore} from 'redux';

const store = createStore(plans);

export default store;