import { combineReducers } from 'redux';
import uiStateReducer from './uiStateReducer';
import inMapsReducer from './inMapsReducer';
import projectsReducer from './projectsReducer';
import servicesReducer from './servicesReducer';
import serviceDetailsReducer from './serviceDetailsReducer';
import commentsReducer from './commentsReducer';
import resourcesListReducer from './resourcesListReducer';
import resourceDetailsReducer from './resourceDetailsReducer';


const rootReducer = combineReducers({
  uiState: uiStateReducer,
  inMaps: inMapsReducer,
  projects: projectsReducer,
  services: servicesReducer,
  serviceDetail: serviceDetailsReducer,
  comments: commentsReducer,
  resourcesList: resourcesListReducer,
  resourceDetails: resourceDetailsReducer,
});

export default rootReducer;
