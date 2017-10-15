import { ActionTypes } from '../actions';
// import banks from '../static/geog/banks';
// import schools from '../static/geog/schools';
// import hospitals from '../static/geog/hospitals';
// import offices from '../static/geog/offices';
//
// const amenitytoDataMapping = {
//   finance: [banks, offices, schools],
//   education: [schools],
//   health: [hospitals],
//   government: [offices],
// };

const initialState = {
  success: 0,
  data: [],
};

const inMapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_MAPDATA:
      return Object.assign({}, state, { success: action.payload.success, data: action.payload.features });
    default:
      return state;
  }
};

export default inMapsReducer;
