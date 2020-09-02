import {
  FETCH_BUSINESS_UNITS_STARTED,
  FETCH_BUSSINESS_UNITS_SUCCESS,
  SET_TARGET_BUSINESS_UNITS,
  REMOVE_BUSINESS_TARGET_FROM_SOURCE,
  SET_TO_BUSINESS_TARGET,
  AUTOMAP_BUSINESSUNITS,
  SET_INIT_BUSINESSUNITS
} from '../constants'
import { setValidationSuccess, setValidationError } from '../actions';
import {httpClient} from '../services/migration.services';
import { isSourceMaped } from '../helpers';
import {batch} from 'react-redux';
import sortBy from 'lodash.sortby';

const fetchBusinessUnitsStarted = () => ({
  type: FETCH_BUSINESS_UNITS_STARTED
})

const fetchBusinessUnitsSuccess = (data) => ({
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
      const incompatibilityLength = sourceBusinessUnits.reduce((acc, next) => next.target ? acc : acc + 1, 0);
      dispatch(setValidationError('mapbusinessunits', `Detected ${incompatibilityLength} issues with mapping business units.`))
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

const automapBusinessUnitsAction = () => ({
  type: AUTOMAP_BUSINESSUNITS
})

export const automapBusinessUnits = (...args) => checkAction(automapBusinessUnitsAction)(...args)

const clearBusinessUnitsAction = () => ({
  type: SET_INIT_BUSINESSUNITS
})

export const clearAllBusiniessUnits = (...args) => checkAction(clearBusinessUnitsAction)(...args);

export const setToBusinessUnitsTarget = (...args) => checkAction(setToTargetAction)(...args);

export const removeBusinessUnitsTarget = (...args) => checkAction(removeTargeAction)(...args);

export const setToBusinessUnitsSource = (...args) => checkAction(setToSourceAction)(...args);

export const fetchBusinessUnits = (id) => {
  return dispatch => {
    dispatch(fetchBusinessUnitsStarted())

    httpClient
      .get(`/${id}/business-units`)
      .then(({ data: { mapedBusinessUnits, sourceBusinessUnits, targetBusinessUnits }}) => {
        let target = null;

        if (targetBusinessUnits.length === 1) {
          const [mapedBusinessUnit] = mapedBusinessUnits;
          target = targetBusinessUnits.find(targetBusinessUnit => targetBusinessUnit.guid === mapedBusinessUnit.target);
        }

        const data = {
          mapedBusinessUnits,
          targetBusinessUnits: sortBy(targetBusinessUnits, ['name']),
          sourceBusinessUnits: sortBy(
            sourceBusinessUnits.map(item => ({
              source: item,
              target
            })),
            [o => o.source.name]
          )
        }

        batch(() => {
          if (isSourceMaped(data.sourceBusinessUnits)) {
            dispatch(setValidationSuccess('mapbusinessunits'))
          } else {
            const incompatibilityLength = data.sourceBusinessUnits.reduce((acc, next) => next.target ? acc : acc + 1, 0);
            dispatch(setValidationError('mapbusinessunits', `Detected ${incompatibilityLength} issues with mapping business units.`))
          }
        })

        dispatch(fetchBusinessUnitsSuccess(data))
      })
  }
}