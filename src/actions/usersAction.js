import {
  FETCH_USERS_STARTED,
  FETCH_USERS_SUCCESS,
  SET_TARGET_USER,
  REMOVE_TARGET_FROM_SOURCE,
  SET_TO_TARGET,
  SET_INIT_USERS,
  AUTOMAP_USERS
} from '../constants'
import { setValidationSuccess, setValidationError } from '../actions';
import { httpClient } from '../services/migration.services';
import { isSourceMaped } from '../helpers';
import sortBy from 'lodash.sortby';
import { batch } from 'react-redux';

const fetchUsersStarted = () => ({
  type: FETCH_USERS_STARTED
})

const fetchUsersSuccess = (data) => ({
  type: FETCH_USERS_SUCCESS,
  payload: data
})

const checkAction = (action) => (...args) => {
  return (dispatch, getState) => {
    dispatch(action(...args));
    const { sourceUsers } = getState().users.data;

    if (
      isSourceMaped(sourceUsers)
    ) {
      dispatch(setValidationSuccess('mapusers'))
    } else {
      const incompatibilityLength = sourceUsers.reduce((acc, next) => next.target ? acc : acc + 1, 0);
      dispatch(setValidationError('mapusers', `Detected ${incompatibilityLength} issues with mapping users.`))
    }
  }
}

const setToTargetAction = (guid, items) => ({
  type: SET_TO_TARGET,
  payload: {
    guid,
    items
  }
})

const setToSourceAction = (sourceId, target) => ({
  type: SET_TARGET_USER,
  payload: {
    sourceId,
    target
  }
})

const removeTargeAction = id => ({
  type: REMOVE_TARGET_FROM_SOURCE,
  payload: id
})

export const setToTarget = (...args) => checkAction(setToTargetAction)(...args);

export const removeTarget = (...args) => checkAction(removeTargeAction)(...args);

export const setToSource = (...args) => checkAction(setToSourceAction)(...args)

const automapUsersAction = () => ({
  type: AUTOMAP_USERS
})

export const automapUser = (...args) => checkAction(automapUsersAction)(...args);

const clearUsersAction = () => ({
  type: SET_INIT_USERS
})

export const clearAllUsers = (...args) => checkAction(clearUsersAction)(...args);

export const fetchUsers = (id) => {
  return dispatch => {
    dispatch(fetchUsersStarted())

    httpClient
      .get(`/${id}/users`)
      .then(({ data: { mapedUsers, sourceUsers, targetUsers } }) => {
        let target = null;

        if (mapedUsers.length === 1) {
          const [mapedUser] = mapedUsers;
          target = targetUsers.find(targetUser => targetUser.guid === mapedUser.target);
        }

        const data = {
          mapedUsers,
          targetUsers: sortBy(targetUsers, ['fullName']),
          sourceUsers: sortBy(
            sourceUsers.map(item => ({
              source: item,
              target
            })),
            [o => o.source.fullName]
          )
        }

        batch(() => {
          if (isSourceMaped(data.sourceUsers)) {
            dispatch(setValidationSuccess('mapusers'));
          } else {
            const incompatibilityLength = data.sourceUsers.reduce((acc, next) => next.target ? acc : acc + 1, 0);
            dispatch(setValidationError('mapusers', `Detected ${incompatibilityLength} issues with mapping users.`))
          }

          dispatch(fetchUsersSuccess(data));
        })
      })
  }
}