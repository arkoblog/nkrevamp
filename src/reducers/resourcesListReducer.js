import { ActionTypes } from '../actions';

const initialState = {
  success: 0,
  data: [],
};

const ResourcesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_RESOURCES_LIST:
      console.log(action.payload);
      return Object.assign({}, state, { success: action.payload.success, data: action.payload.resources });
    default:
      return state;
  }
};

export default ResourcesListReducer;
