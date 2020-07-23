import {
  FETCH_TEAMS_STARTED,
  FETCH_TEAMS_SUCCESS,
  SET_TARGET_TEAMS,
  REMOVE_TEAMS_TARGET_FROM_SOURCE,
  SET_TO_TEAMS_TARGET,
  USE_TEAMS_AUTOMAP
} from '../constants'
import { setValidationSuccess, setValidationInit } from '../actions';
import MigrationService from '../services/migration.services';
import { isSourceMaped } from '../helpers';

const fetchUsersStarted = () => ({
  type: FETCH_TEAMS_STARTED
})

const fetchUsersSuccess = (data) => ({
  type: FETCH_TEAMS_SUCCESS,
  payload: data
})

const checkAction = (action) => (...args) => {
  return (dispatch, getState) => {
    dispatch(action(...args));
    const { targetTeams, sourceTeams, mapedTeams } = getState().teams.data;

    if (
      targetTeams.length === 0 ||
      isSourceMaped(sourceTeams, mapedTeams)
    ) {
      dispatch(setValidationSuccess('mapteams'))
    } else {
      dispatch(setValidationInit('mapteams'))
    }
  }
}

const setToTargetAction = (guid, items) => ({
  type: SET_TO_TEAMS_TARGET,
  payload: {
    guid,
    items
  }
})

const setToSourceAction = (sourceId, target) => ({
  type: SET_TARGET_TEAMS,
  payload: {
    sourceId,
    target
  }
})

const removeTargeAction = id => ({
  type: REMOVE_TEAMS_TARGET_FROM_SOURCE,
  payload: id
})

const runAutomapAction = () => ({
  type: USE_TEAMS_AUTOMAP
})

export const setToTeamsTarget = (...args) => checkAction(setToTargetAction)(...args);

export const removeTeamsTarget = (...args) => checkAction(removeTargeAction)(...args);

export const setToTeamsSource = (...args) => checkAction(setToSourceAction)(...args)

export const runTeamsAutomap = (...args) => checkAction(runAutomapAction)(...args);

export const fetchTeams = (id) => {
  return dispatch => {
    dispatch(fetchUsersStarted())

    MigrationService
      .get(`/migration-job/${id}/teams`)
      .then(({ mapedTeams, sourceTeams, targetTeams }) => {
        const data = {
          mapedTeams,
          targetTeams,
          sourceTeams: sourceTeams.map(item => ({
            source: item,
            target: null
          }))
        }
        dispatch(fetchUsersSuccess(data))
      })
  }
}