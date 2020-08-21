import {
  FETCH_TEAMS_STARTED,
  FETCH_TEAMS_SUCCESS,
  SET_TARGET_TEAMS,
  REMOVE_TEAMS_TARGET_FROM_SOURCE,
  SET_TO_TEAMS_TARGET,
  USE_TEAMS_AUTOMAP,
  CLEAR_TARGET_TEAMS,
  AUTOMAP_TEAMS
} from '../constants'
import { setValidationSuccess, setValidationError } from '../actions';
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

const checkValidity = (action) => (...args) => {
  return (dispatch, getState) => {
    dispatch(action(...args));
    const { sourceTeams } = getState().teams.data;

    if (
      isSourceMaped(sourceTeams)
    ) {
      dispatch(setValidationSuccess('mapteams'))
    } else {
      const incompatibilityLength = sourceTeams.reduce((acc, next) => next.target ? acc : acc + 1, 0);
      dispatch(setValidationError('mapteams', `Detected ${incompatibilityLength} issues with mapping teams.`))
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

const automapTeamsAction = () => ({
  type: AUTOMAP_TEAMS
})

const clearAllTeamsAction = () => ({
  type: CLEAR_TARGET_TEAMS
})

export const automapTeams = (...args) => checkValidity(automapTeamsAction)(...args);

export const clearAllTeams = (...args) => checkValidity(clearAllTeamsAction)(...args);

export const setToTeamsTarget = (...args) => checkValidity(setToTargetAction)(...args);

export const removeTeamsTarget = (...args) => checkValidity(removeTargeAction)(...args);

export const setToTeamsSource = (...args) => checkValidity(setToSourceAction)(...args)

export const runTeamsAutomap = (...args) => checkValidity(runAutomap)(...args); 

export const fetchTeams = (id) => {
  return dispatch => {
    dispatch(fetchUsersStarted())

    MigrationService
      .get(`/${id}/teams`)
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