import { batch } from 'react-redux';
import {
  SET_CURRENT_STEP,
  SETTINGS_INIT_STARTED,
  SETTINGS_INIT_SUCCESS,
  SET_EDIT_ABILITY,
  SET_STEP_CONTROL_STATUS,
} from '../constants'
import {
  setValidationSuccess,
  setValidationInit,
  setIsBack
} from '../actions'
import MigrationService from '../services/migration.services'
import { getNextStep } from '../helpers';

const settingsInitStarted = () => ({
  type: SETTINGS_INIT_STARTED
})

const settingsInitSuccess = (settings) => ({
  type: SETTINGS_INIT_SUCCESS,
  payload: settings
})

const setNextStepAction = step => ({
  type: SET_CURRENT_STEP,
  payload: getNextStep(step)
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

// export const setSourceEnvironmentStep = () => {
//   return dispatch => {
//     batch(() => {
//       dispatch(setValidationInit('environments'));
//       dispatch(setValidationInit('targetenvironment'));
//       dispatch(setValidationInit('sourceenvironment'));
//       dispatch(setCurrentStep('sourceenvironment'));
//     })
//   }
// }

export const setNextMapBusinessUnitsStep = (id) => {
  return (dispatch, getState) => {
    const users = getState().users.data.sourceUsers.map(item => {
      return {
        source: item.source.guid,
        target: item.target.guid
      }
    })

    setStepControlStatus('loading')

    MigrationService
      .postStep(`/migration-job/${id}/users`, { users })
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

    setStepControlStatus('loading')

    MigrationService
      .postStep(`/migration-job/${id}/business-units`, { mapedBusinessUnits })
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

    setStepControlStatus('loading')

    MigrationService
      .postStep(`/migration-job/${id}/teams`, { mapedTeams })
      .then(() => {
        batch(() => {
          dispatch(setStepControlStatus('hidden'));
          dispatch(setValidationSuccess('map'))
          dispatch(setCurrentStep('summary'));
        })
      })
  }
}

export const setNextStep = (id, step) => {
  return (dispatch, getState) => {
    if (step === 'entities') {
      const { data, selectedEntities } = getState().entities;

      const entities = data
        .filter(entity => selectedEntities.includes(entity.logicalName))
        .map(entity => ({
          displayName: '',
          logicalName: entity.logicalName,
          description: ''
        }))

      dispatch(setStepControlStatus('loading'))

      MigrationService
        .postStep(`/migration-job/${id}/entities/add-entities-list`, { entities })
        .then(() => {
          batch(() => {
            dispatch(setStepControlStatus('hidden'));
            dispatch(setNextStepAction(step));
          })
        })
    } else if (step === 'mapusers') {
      const { sourceUsers, targetUsers } = getState().users.data;
      const users = sourceUsers.map(sourceUser => {
        const target = targetUsers.find(targetUser => targetUser.fullName === sourceUser.target.fullName);

        return {
          source: sourceUser.source.guid,
          target: target.guid
        }
      })

      dispatch(setStepControlStatus('loading'));

      MigrationService
        .postStep(`/migration-job/${id}/users/add-users`, { users })
        .then(() => {
          batch(() => {
            dispatch(setStepControlStatus('hidden'));
            dispatch(setNextStepAction(step))
          })
        })

    } else if (step === 'mapbusinessunits') {
      const { sourceBusinessUnits, targetBusinessUnits } = getState().businessunits.data;
      const mapedBusinessUnits = sourceBusinessUnits.map(sourceBusinessUnit => {
        const target = targetBusinessUnits.find(targetBusinessUnit => targetBusinessUnit.name === sourceBusinessUnit.target.name);

        return {
          source: sourceBusinessUnit.source.guid,
          target: target.guid
        }
      })

      dispatch(setStepControlStatus('loading'));

      MigrationService
        .postStep(`/migration-job/${id}/business-units`, { mapedBusinessUnits })
        .then(() => {
          batch(() => {
            dispatch(setStepControlStatus('hidden'));
            dispatch(setNextStepAction(step))
          })
        })
    } else if (step === 'mapteams') {
      const { sourceTeams, targetTeams } = getState().teams.data;
      const mapedTeams = sourceTeams.map(sourceTeam => {
        const target = targetTeams.find(targetTeam => targetTeam.name === sourceTeam.target.name);

        return {
          source: sourceTeam.source.guid,
          target: target.guid
        }
      })

      dispatch(setStepControlStatus('loading'));

      MigrationService
        .postStep(`/migration-job/${id}/teams/add-teams`, { mapedTeams })
        .then(() => {
          batch(() => {
            dispatch(setStepControlStatus('hidden'));
            dispatch(setValidationSuccess('map'))
            dispatch(setNextStepAction(step))
          })
        })
    } else {
      dispatch(setNextStepAction(step));
    }
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
      dispatch(setIsBack(true));
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
      .get(`/migration-job/${id}`)
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