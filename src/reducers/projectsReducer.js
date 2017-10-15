import { ActionTypes } from '../actions';

const initialState = {
  data: {},
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_BUDGET:
      return Object.assign({}, state, { data: action.payload });
    default:
      return state;
  }
};

export default projectsReducer;
