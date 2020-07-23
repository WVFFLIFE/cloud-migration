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
    const { targetBusinessUnits, sourceBusinessUnits, mapedBusinessUnits } = getState().businessunits.data;

    if (
      targetBusinessUnits.length === 0 ||
      isSourceMaped(sourceBusinessUnits, mapedBusinessUnits)
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

const runAutomapAction = () => ({
  type: USE_BUSINESS_AUTOMAP
})

export const setToBusinessUnitsTarget = (...args) => checkAction(setToTargetAction)(...args);

export const removeBusinessUnitsTarget = (...args) => checkAction(removeTargeAction)(...args);

export const setToBusinessUnitsSource = (...args) => checkAction(setToSourceAction)(...args)

export const runBusinessUnitsAutomap = (...args) => checkAction(runAutomapAction)(...args);

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