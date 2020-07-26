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
import { v4 as uuid } from "uuid";

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
    const { sourceTeams } = getState().teams.data;

    if (
      isSourceMaped(sourceTeams)
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

const runAutomapAction = (data) => ({
  type: USE_TEAMS_AUTOMAP,
  payload: data
})

const runAutomap = () => {
  return (dispatch, getState) => {
    const { sourceTeams, targetTeams, mapedTeams } = getState().teams.data;

    const newSourceTeams = sourceTeams.map(item => {
      const itemInMap = mapedTeams.find(mapedTeam => mapedTeam.source === item.source.guid);

      if (itemInMap) {
        const target = targetTeams.find(targetTeam => targetTeam.guid === itemInMap.target);
        return {
          source: item.source,
          target: {
            ...target,
            guid: uuid()
          }
        }
      }

      return item;
    })

    dispatch(runAutomapAction(newSourceTeams));
  }
}

export const setToTeamsTarget = (...args) => checkAction(setToTargetAction)(...args);

export const removeTeamsTarget = (...args) => checkAction(removeTargeAction)(...args);

export const setToTeamsSource = (...args) => checkAction(setToSourceAction)(...args)

export const runTeamsAutomap = (...args) => checkAction(runAutomap)(...args); 

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