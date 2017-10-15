import { ActionTypes } from '../actions';

const initialState = {
  success: 0,
  data: [],
};

const ServicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SERVICES:
      return Object.assign({}, state, { success: action.payload.success, data: action.payload.services });
    default:
      return state;
  }
};

export default ServicesReducer;
