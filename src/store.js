import {createStore} from 'redux';
import randReducer from './reducers/randReducer';

export default createStore(randReducer);