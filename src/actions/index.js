import axios from 'axios';


export const ROOT_URL = 'http://139.59.227.15:8080/api/v1';
// export const INMAPS_URL = 'https://api-map-nilkantha.herokuapp.com/api/v1';


export const ActionTypes = {
  TOGGLE_NAV: 'TOGGLE_NAV',
  TOGGLE_PROJECTS_FILTER: 'TOGGLE_PROJECTS_FILTER',
  LOAD_MAPDATA: 'LOAD_MAPDATA',
  FETCH_BUDGET: 'FETCH_BUDGET',
  FETCH_SERVICES: 'FETCH_SERVICES',
  FETCH_SERVICE_DETAILS: 'FETCH_SERVICE_DETAILS',
  FETCH_COMMENTS: 'FETCH_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  FETCH_RESOURCES_LIST: 'FETCH_RESOURCES_LIST',
  FETCH_RESOURCE_DETAILS: 'FETCH_RESOURCE_DETAILS',
};

export function toggleNav() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.TOGGLE_NAV,
      payload: null,
    });
  };
}

export function toggleProjectsFilter() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.TOGGLE_PROJECTS_FILTER,
      payload: null,
    });
  };
}


export function loadMapData(type) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/map/features`, { params: type }).then((response) => {
      // console.log(filters, response.data);
      dispatch({ type: ActionTypes.LOAD_MAPDATA, payload: response.data });
    }).catch((error) => {
      console.log(error.message);
      // dispatch(addNotif({
      //   message: error.message,
      //   level: 'error',
      //   label: 'Close',
      // }));
    });
  };
}


export function fetchBudget(filters) {
  // console.log(filters);
  return (dispatch) => {
    axios.get(`${ROOT_URL}/budgets`, { params: filters }).then((response) => {
      // console.log(filters, response.data);
      dispatch({ type: ActionTypes.FETCH_BUDGET, payload: response.data });
    }).catch((error) => {
      console.log(error.message);
      // dispatch(addNotif({
      //   message: error.message,
      //   level: 'error',
      //   label: 'Close',
      // }));
    });
  };
}


export function fetchServices() {
  // console.log(filters);
  return (dispatch) => {
    axios.get(`${ROOT_URL}/services`).then((response) => {
      // console.log(filters, response.data);
      dispatch({ type: ActionTypes.FETCH_SERVICES, payload: response.data });
    }).catch((error) => {
      console.log(error.message);
      // dispatch(addNotif({
      //   message: error.message,
      //   level: 'error',
      //   label: 'Close',
      // }));
    });
  };
}

export function fetchServiceDetails(id) {
  // console.log(filters);
  return (dispatch) => {
    axios.get(`${ROOT_URL}/services/detail/${id}`).then((response) => {
      // console.log(id, response.data);
      dispatch({ type: ActionTypes.FETCH_SERVICE_DETAILS, payload: response.data });
    }).catch((error) => {
      console.log(error.message);
      // dispatch(addNotif({
      //   message: error.message,
      //   level: 'error',
      //   label: 'Close',
      // }));
    });
  };
}

export function fetchComments(type, id) {
  // console.log(filters);
  return (dispatch) => {
    console.log(type, id);
    axios.get(`${ROOT_URL}/comments/fetch/${type}/${id}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_COMMENTS, payload: response.data });
    }).catch((error) => {
      console.log(error.message);
      // dispatch(addNotif({
      //   message: error.message,
      //   level: 'error',
      //   label: 'Close',
      // }));
    });
  };
}


export function addComments(comments, type, id) {
  // console.log(filters);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/comments/add/${type}/${id}`, comments).then((response) => {
      dispatch({ type: ActionTypes.ADD_COMMENT, payload: response.data });
    }).catch((error) => {
      console.log(error.message);
      // dispatch(addNotif({
      //   message: error.message,
      //   level: 'error',
      //   label: 'Close',
      // }));
    });
  };
}


export function fetchResourcesList() {
  // console.log(filters);
  return (dispatch) => {
    axios.get(`${ROOT_URL}/resources`).then((response) => {
      // console.log(filters, response.data);
      dispatch({ type: ActionTypes.FETCH_RESOURCES_LIST, payload: response.data });
    }).catch((error) => {
      console.log(error.message);
      // dispatch(addNotif({
      //   message: error.message,
      //   level: 'error',
      //   label: 'Close',
      // }));
    });
  };
}

export function fetchResourceDetails(section, subsection) {
  // console.log(filters);
  return (dispatch) => {
    axios.get(`${ROOT_URL}/resources/${section}/${subsection}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_RESOURCE_DETAILS, payload: response.data });
    }).catch((error) => {
      console.log(error.message);
      // dispatch(addNotif({
      //   message: error.message,
      //   level: 'error',
      //   label: 'Close',
      // }));
    });
  };
}
