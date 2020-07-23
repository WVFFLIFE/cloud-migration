import { combineReducers } from 'redux';

import jobsListReducer from './jobsListReducer';
import stepsSettingsReducer from './stepsSettingsReducer';
import sourceEnvironmentReducer from './sourceEnvironmentReducer';
import targetEnvironmentReducer from './targetEnvironmentReducer';
import validationReducer from './validationReducer';
import entitiesReducer from './entitiesReducer';
import mapUsersReducer from './mapUsersReducer';
import mapBusinessUnitsReducer from './mapBusinessUnitsReducer';
import mapTeamsReducer from './mapTeamsReducer';

export default combineReducers({
    teams: mapTeamsReducer,
    businessunits: mapBusinessUnitsReducer,
    users: mapUsersReducer,
    entities: entitiesReducer,
    jobsValue: jobsListReducer,
    stepsSettings: stepsSettingsReducer,
    validation: validationReducer,
    sourceEnvironment: sourceEnvironmentReducer,
    targetEnvironment: targetEnvironmentReducer,
})