import {batch} from 'react-redux';
import {
  SET_CURRENT_STEP,
  SETTINGS_INIT_STARTED,
  SETTINGS_INIT_SUCCESS,
} from '../constants'
import {setValidationSuccess} from '../actions'
import MigrationService from '../services/migration.services'
import { getNextStep } from '../helpers';

function getStepByStatus(status) {
  switch (status) {
    case 'Draft':
      return 'sourceenvironment'
    case 'Scheduled':
      return 'summary'
    case 'Started':
      return 'summary'
    case 'Completed':
      return 'summary'
    case 'Involvement needed':
      return 'summary'
    default:
      return 'sourceenvironment'
  }
}

const settingsInitStarted = () => ({
  type: SETTINGS_INIT_STARTED
})

const settingsInitSuccess = (step) => ({
  type: SETTINGS_INIT_SUCCESS,
  payload: step
})

const setNextStepAction = step => ({
  type: SET_CURRENT_STEP,
  payload: getNextStep(step)
})

export const setCurrentStep = (step) => ({
  type: SET_CURRENT_STEP,
  payload: step
})

export const setNextStep = (id, step) => {
  return (dispatch, getState) => {
    if (step === 'entities') {
      const entities = getState().entities.reports.map(item => ({
        displayName: '',
        logicalName: item.logicalName,
        description: ''
      }))
      MigrationService
        .postStep(`/migration-job/${id}/entities/add-entities-list`, { entities })
        .then(() => {
          dispatch(setNextStepAction(step));
        })
    } else if (step === 'mapusers') {
      const users = getState().users.data.mapedUsers;
      MigrationService
        .postStep(`/migration-job/${id}/users/add-users`, { users })
        .then(() => {
          dispatch(setNextStepAction(step))
        })
    } else if (step === 'mapbusinessunits') {
      const mapedBusinessUnits = getState().businessunits.data.mapedBusinessUnits;
      MigrationService
        .postStep(`/migration-job/${id}/business-units`, { mapedBusinessUnits })
        .then(() => {
          dispatch(setNextStepAction(step))
        })
    } else if (step === 'mapteams') {
      const mapedTeams = getState().teams.data.mapedTeams;
      MigrationService
        .postStep(`/migration-job/${id}/teams/add-teams`, { mapedTeams })
        .then(() => {
          batch(() => {
            dispatch(setValidationSuccess('map'))
            dispatch(setNextStepAction(step))
          })
        })
    } else {
      dispatch(setNextStepAction(step));
    }
  }
}

export const initStepSettings = (id) => {
  return dispatch => {
    dispatch(settingsInitStarted());

    MigrationService
      .get(`/migration-job/${id}`)
      .then(data => {
        const step = getStepByStatus(data.status)
        dispatch(settingsInitSuccess(step))
      })
  }
}