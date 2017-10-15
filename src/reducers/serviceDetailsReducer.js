import { ActionTypes } from '../actions';

const initialState = {
  success: 0,
  data: [],
};

const serviceDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SERVICE_DETAILS:
      console.log(action);
      return Object.assign({}, state, { success: action.payload.success, data: action.payload.service });
    default:
      return state;
  }
};

export default serviceDetailsReducer;
