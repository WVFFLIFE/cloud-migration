import { batch } from 'react-redux';
import {
  SET_CURRENT_STEP,
  SETTINGS_INIT_STARTED,
  SETTINGS_INIT_SUCCESS,
  SET_EDIT_ABILITY,
  SET_STEP_CONTROL_STATUS,
  INIT_STEP_SETTINGS
} from '../constants'
import {
  setValidationSuccess,
  setValidationInit,
} from '../actions'
import MigrationService from '../services/migration.services'

export const initializeStep = () => ({
  type: INIT_STEP_SETTINGS
})

const settingsInitStarted = () => ({
  type: SETTINGS_INIT_STARTED
})

const settingsInitSuccess = (settings) => ({
  type: SETTINGS_INIT_SUCCESS,
  payload: settings
})

const setEditAbility = flag => ({
  type: SET_EDIT_ABILITY,
  payload: flag
})

export const setCurrentStep = (step) => ({
  type: SET_CURRENT_STEP,
  payload: step
})

export const setStepControlStatus = (status) => ({
  type: SET_STEP_CONTROL_STATUS,
  payload: status
})

export const setNextMapBusinessUnitsStep = (id) => {
  return (dispatch, getState) => {
    const users = getState().users.data.sourceUsers.map(item => {
      return {
        source: item.source.guid,
        target: item.target.guid
      }
    })

    dispatch(setStepControlStatus('loading'));

    MigrationService
      .postStep(`/${id}/users`, { users })
      .then(() => {
        batch(() => {
          dispatch(setStepControlStatus('hidden'));
          dispatch(setCurrentStep('mapbusinessunits'))
        })
      })
  }
}

export const setNextMapTeamsStep = (id) => {
  return (dispatch, getState) => {
    const mapedBusinessUnits = getState().businessunits.data.sourceBusinessUnits.map(item => {
      return {
        source: item.source.guid,
        target: item.target.guid
      }
    })

    dispatch(setStepControlStatus('loading'));

    MigrationService
      .postStep(`/${id}/business-units`, { mapedBusinessUnits })
      .then(() => {
        batch(() => {
          dispatch(setStepControlStatus('hidden'));
          dispatch(setCurrentStep('mapteams'))
        })
      })
  }
}

export const setNextScheduleStep = (id) => {
  return (dispatch, getState) => {
    const mapedTeams = getState().teams.data.sourceTeams.map(item => {
      return {
        source: item.source.guid,
        target: item.target.guid
      }
    })

    dispatch(setStepControlStatus('loading'));

    MigrationService
      .postStep(`/${id}/teams`, { mapedTeams })
      .then(() => {
        batch(() => {
          dispatch(setStepControlStatus('hidden'));
          dispatch(setValidationSuccess('map'))
          dispatch(setCurrentStep('summary'));
        })
      })
  }
}

export const backToSourceEnvrionmentStep = () => {
  return dispatch => {
    batch(() => {
      dispatch(setValidationInit('environments'));
      dispatch(setValidationInit('targetenvironment'));
      dispatch(setValidationInit('sourceenvironment'));
      dispatch(setCurrentStep('sourceenvironment'));
    })
  }
}

export const backToTargetEnvironmentStep = () => {
  return dispatch => {
    batch(() => {
      dispatch(setValidationInit('entities'));
      dispatch(setValidationInit('environments'));
      dispatch(setValidationInit('targetenvironment'));
      dispatch(setCurrentStep('targetenvironment'))
    })
  }
}

export const backToEntitiesStep = () => {
  return dispatch => {
    batch(() => {
      dispatch(setValidationInit('mapusers'));
      dispatch(setValidationInit('entities'));
      dispatch(setCurrentStep('entities'));
    })
  }
}

export const backToMapUsersStep = () => {
  return dispatch => {
    batch(() => {
      dispatch(setValidationInit('mapbusinessunits'));
      dispatch(setValidationInit('mapusers'));
      dispatch(setCurrentStep('mapusers'));
    })
  }
}

export const backToMapBusinessUnitsStep = () => {
  return dispatch => {
    batch(() => {
      dispatch(setValidationInit('map'));
      dispatch(setValidationInit('mapteams'));
      dispatch(setValidationInit('mapbusinessunits'));
      dispatch(setCurrentStep('mapbusinessunits'));
    })
  }
}

export const backToMapTeamsStep = () => {
  return dispatch => {
    batch(() => {
      dispatch(setValidationInit('summary'));
      dispatch(setValidationInit('map'));
      dispatch(setValidationInit('mapteams'));
      dispatch(setCurrentStep('mapteams'));
    })
  }
}

export const setValidationSuccessByStep = () => {
  return dispatch => {
    batch(() => {
      [
        'environments', 'sourceenvironment', 'targetenvironment', 'entities',
        'entities', 'map', 'mapusers', 'mapbusinessunits', 'mapteams'
      ].forEach(step => dispatch(setValidationSuccess(step)))
    })
  }
}

export const initStepSettings = (id, errCallback) => {
  return dispatch => {
    dispatch(settingsInitStarted());

    MigrationService
      .get(`/${id}`)
      .then(({ status }) => {
        batch(() => {
          if (status === 'Draft') {
            dispatch(settingsInitSuccess({
              step: 'sourceenvironment',
              status,
            }))
            dispatch(setEditAbility(true))
          } else if (status === 'Scheduled') {
            dispatch(settingsInitSuccess({
              step: 'summary',
              status,
            }))
            dispatch(setValidationSuccessByStep())
            dispatch(setEditAbility(true))
          } else if (['Started', 'Completed', 'Involvement needed']) {
            dispatch(settingsInitSuccess({
              step: 'summary',
              status,
            }))
            dispatch(setValidationSuccessByStep())
            dispatch(setEditAbility(false))
          } else {
            dispatch(settingsInitSuccess({
              step: 'sourceenvironment',
              status,
            }))
            dispatch(setValidationSuccessByStep())
          }
        })
      })
      .catch(() => errCallback())
  }
}