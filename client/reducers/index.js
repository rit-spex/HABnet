import { combineReducers } from 'redux';
import Sockets from './Sockets';

export default combineReducers({
  sockets: Sockets,
});
