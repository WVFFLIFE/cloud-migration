import {
  FETCH_BUSINESS_UNITS_STARTED,
  FETCH_BUSSINESS_UNITS_SUCCESS,
  SET_TARGET_BUSINESS_UNITS,
  REMOVE_BUSINESS_TARGET_FROM_SOURCE,
  USE_BUSINESS_AUTOMAP,
  SET_TO_BUSINESS_TARGET
} from '../constants'
import { setValidationSuccess, setValidationInit } from '../actions';
import MigrationService from '../services/migration.services';
import { isSourceMaped } from '../helpers';
import { v4 as uuid } from "uuid";

const fetchUsersStarted = () => ({
  type: FETCH_BUSINESS_UNITS_STARTED
})

const fetchUsersSuccess = (data) => ({
  type: FETCH_BUSSINESS_UNITS_SUCCESS,
  payload: data
})

const checkAction = (action) => (...args) => {
  return (dispatch, getState) => {
    dispatch(action(...args));
    const { sourceBusinessUnits } = getState().businessunits.data;

    if (
      isSourceMaped(sourceBusinessUnits)
    ) {
      dispatch(setValidationSuccess('mapbusinessunits'))
    } else {
      dispatch(setValidationInit('mapbusinessunits'))
    }
  }
}

const setToTargetAction = (guid, items) => ({
  type: SET_TO_BUSINESS_TARGET,
  payload: {
    guid,
    items
  }
})

const setToSourceAction = (sourceId, target) => ({
  type: SET_TARGET_BUSINESS_UNITS,
  payload: {
    sourceId,
    target
  }
})

const removeTargeAction = id => ({
  type: REMOVE_BUSINESS_TARGET_FROM_SOURCE,
  payload: id
})

const runAutomapAction = (data) => ({
  type: USE_BUSINESS_AUTOMAP,
  payload: data
})

const runAutomap = () => {
  return (dispatch, getState) => {
    const { sourceBusinessUnits, targetBusinessUnits, mapedBusinessUnits } = getState().businessunits.data;

    const newSourceBusinessUnits = sourceBusinessUnits.map(item => {
      const itemInMap = mapedBusinessUnits.find(mapedUser => mapedUser.source === item.source.guid);

      if (itemInMap) {
        const target = targetBusinessUnits.find(targetUser => targetUser.guid === itemInMap.target);
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

    dispatch(runAutomapAction(newSourceBusinessUnits))
  }
}

export const setToBusinessUnitsTarget = (...args) => checkAction(setToTargetAction)(...args);

export const removeBusinessUnitsTarget = (...args) => checkAction(removeTargeAction)(...args);

export const setToBusinessUnitsSource = (...args) => checkAction(setToSourceAction)(...args);

export const runBusinessUnitsAutomap = (...args) => checkAction(runAutomap)(...args); 

export const fetchBusinessUnits = (id) => {
  return dispatch => {
    dispatch(fetchUsersStarted())

    MigrationService
      .get(`/migration-job/${id}/business-units`)
      .then(({ mapedBusinessUnits, sourceBusinessUnits, targetBusinessUnits }) => {
        const data = {
          mapedBusinessUnits,
          targetBusinessUnits,
          sourceBusinessUnits: sourceBusinessUnits.map(item => ({
            source: item,
            target: null
          }))
        }
        dispatch(fetchUsersSuccess(data))
      })
  }
}