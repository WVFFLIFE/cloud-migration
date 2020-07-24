import {
  FETCH_ENTITIES_DATA_STARTED,
  FETCH_ENTITIES_DATA_SUCCESS,
  SET_CURRENT_PAGE,
  SET_ORDER,
  SET_ORDER_BY,
  SET_TOTAL_ITEMS,
  SET_REPORTS
} from '../constants';
import {
  setValidationStart,
  setValidationSuccess,
  setValidationError
} from '../actions'
import {batch} from 'react-redux';
import MigrationService from '../services/migration.services';

function modifyEntities(prevList, validationList) {
  return prevList.map(item => {
    const validationData = validationList.find(validationItem => validationItem.logicalName === item.logicalName);
    let validationSettings = {status: 'hidden', message: ''};

    if (!validationData) {
      return {
        ...item,
        validationSettings
      }
    } else if (!validationData.errors.length) {
      validationSettings = {status: 'success', message: 'Success!'}
    } else if (validationData.errors.length) {
      validationSettings = {status: "error", message: validationData.errors}
    }

    return {
      ...item,
      validationSettings
    }
  })
}

const fetchEntitiesStarted = () => ({
  type: FETCH_ENTITIES_DATA_STARTED
})

const fetchEntitiesSuccess = (list) => ({
  type: FETCH_ENTITIES_DATA_SUCCESS,
  payload: list
})

const setTotalItems = (total) => ({
  type: SET_TOTAL_ITEMS,
  payload: total
})

const setReports = (reports) => ({
  type: SET_REPORTS,
  payload: reports
})

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page
})

export const setOrder = (order) => ({
  type: SET_ORDER,
  payload: order
})

export const setOrderBy = (orderBy) => ({
  type: SET_ORDER_BY,
  payload: orderBy
})

export const fetchEntities = (id) => {
  return (dispatch, getState) => {
    const {
      currentPage: pageNumber,
      itemsPerPage: pageSize,
      orderBy,
      order,
      reports
    } = getState().entities;

    dispatch(fetchEntitiesStarted());

    const descStatus = order === 'desc';

    MigrationService
      .get(`/migration-job/${id}/entities?pageNumber=${pageNumber + 1}&pageSize=${pageSize}&orderBy=${orderBy}&descending=${descStatus}`)
      .then(data => {
        const {paginationParameters, result} = data;
        const entitiesList = reports.length ? modifyEntities(result, reports) : result;

        batch(() => {
          dispatch(fetchEntitiesSuccess(entitiesList))
          dispatch(setTotalItems(paginationParameters.totalCount))
        })
      })
  }
}

export const validateEntities = (id, SelectedEntities, flag) => {
  return (dispatch, getState) => {
    const body = {SelectedEntities}
    const {data: currentEntities} = getState().entities;
    const query = flag ? `?all=${flag}` : '';

    dispatch(setValidationStart('entities'));

    MigrationService
      .post(`/migration-job/${id}/entities/validate-entities${query}`, body)
      .then(({validationResult, reports}) => {
        const newEntities = modifyEntities(currentEntities, reports);

        batch(() => {
          if (validationResult) {
            dispatch(setValidationSuccess('entities', 'Validation successful. No compatibility issues detected. Press “Next” to go further.'));
          } else {
            dispatch(setValidationError('entities', 'Detected compatibility issues with target environment'));
          }
          dispatch(fetchEntitiesSuccess(newEntities))
          dispatch(setReports(reports))
        })
      })
  }
}