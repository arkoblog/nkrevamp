import { ActionTypes } from '../actions';

const initialState = {
  success: 0,
  data: [],
};

const resourceDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_RESOURCE_DETAILS:
      console.log(action);
      return Object.assign({}, state, { success: action.payload.success, data: action.payload.data });
    default:
      return state;
  }
};

export default resourceDetailsReducer;
