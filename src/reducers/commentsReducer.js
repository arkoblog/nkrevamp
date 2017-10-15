import { ActionTypes } from '../actions';

const initialState = {
  success: 0,
  comments: [],
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_COMMENTS:
      console.log(action.payload);
      return Object.assign({}, state, { success: action.payload.success, comments: action.payload.comments });
    default:
      return state;
  }
};

export default commentsReducer;
