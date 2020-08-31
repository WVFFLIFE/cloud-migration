import {
  FETCH_TEAMS_STARTED,
  FETCH_TEAMS_SUCCESS,
  SET_TARGET_TEAMS,
  REMOVE_TEAMS_TARGET_FROM_SOURCE,
  SET_TO_TEAMS_TARGET,
  CLEAR_TARGET_TEAMS,
  AUTOMAP_TEAMS
} from '../constants'
import { setValidationSuccess, setValidationError } from '../actions';
import {httpClient} from '../services/migration.services';
import { isSourceMaped } from '../helpers';
import sortBy from 'lodash.sortby';

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

export const fetchTeams = (id) => {
  return dispatch => {
    dispatch(fetchUsersStarted())

    httpClient
      .get(`/${id}/teams`)
      .then(({ data: { mapedTeams, sourceTeams, targetTeams }}) => {
        let target = null;

        if (mapedTeams.length === 1) {
          const [mapedTeam] = mapedTeams;
          target = targetTeams.find(targetTeam => targetTeams.guid === mapedTeam.target);
        }

        const data = {
          mapedTeams,
          targetTeams: sortBy(targetTeams, ['name']),
          sourceTeams: sortBy(
            sourceTeams.map(item => ({
              source: item,
              target
            })),
            [o => o.source.name]
          )
        }
        dispatch(fetchUsersSuccess(data))
      })
  }
}