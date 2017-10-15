import { ActionTypes } from '../actions';

const initialState = {
  isNavMinimized: false,
  isFilterMinimized: true,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_NAV:
      // console.log('toggleNav');
      return Object.assign({}, state, { isNavMinimized: !state.isNavMinimized });

    case ActionTypes.TOGGLE_PROJECTS_FILTER:
      return Object.assign({}, state, { isFilterMinimized: !state.isFilterMinimized });
    default:
      return state;
  }
};

export default AuthReducer;
