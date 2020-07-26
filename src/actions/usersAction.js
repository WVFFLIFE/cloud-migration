import {
  FETCH_USERS_STARTED,
  FETCH_USERS_SUCCESS,
  SET_TARGET_USER,
  REMOVE_TARGET_FROM_SOURCE,
  SET_TO_TARGET,
  USE_AUTOMAP
} from '../constants'
import { setValidationSuccess, setValidationInit } from '../actions';
import MigrationService from '../services/migration.services';
import { isSourceMaped } from '../helpers';
import { v4 as uuid } from "uuid";

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
      dispatch(setValidationInit('mapusers'))
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

const runAutomapAction = (data) => ({
  type: USE_AUTOMAP,
  payload: data
})

const rnAuto = () => {
  return (dispatch, getState) => {
    const { sourceUsers, targetUsers, mapedUsers } = getState().users.data;

    const newSourceUsers = sourceUsers.map(item => {
      const itemInMap = mapedUsers.find(mapedUser => mapedUser.source === item.source.guid);

      if (itemInMap) {
        const target = targetUsers.find(targetUser => targetUser.guid === itemInMap.target);
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

    dispatch(runAutomapAction(newSourceUsers))
  }
}

export const setToTarget = (...args) => checkAction(setToTargetAction)(...args);

export const removeTarget = (...args) => checkAction(removeTargeAction)(...args);

export const setToSource = (...args) => checkAction(setToSourceAction)(...args)

export const runAutomap = (...args) => checkAction(rnAuto)(...args); 

export const fetchUsers = (id) => {
  return dispatch => {
    dispatch(fetchUsersStarted())

    MigrationService
      .get(`/migration-job/${id}/users`)
      .then(({ mapedUsers, sourceUsers, targetUsers }) => {
        const data = {
          mapedUsers,
          targetUsers,
          sourceUsers: sourceUsers.map(item => ({
            source: item,
            target: null
          }))
        }
        dispatch(fetchUsersSuccess(data))
      })
  }
}