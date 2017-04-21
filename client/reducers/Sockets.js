import Immutable from 'immutable';
import ActionTypes from '../actions/ActionTypes';

const DEFAULT = Immutable.Map();

export default function Episodes(state = DEFAULT, action) {
  const { type, data } = action;

  switch (type) {

    case ActionTypes.FETCH_EPISODES_SUCCEEDED:
      return data;

    default:
      return state;
  }
}
