import {
  FETCH_ENTITIES_DATA_STARTED,
  FETCH_ENTITIES_DATA_SUCCESS,
  SET_CURRENT_PAGE,
  SET_ORDER,
  SET_ORDER_BY,
  SET_TOTAL_ITEMS,
  SET_REPORTS,
  SET_SELECTED_ENTITIES,
  SET_INIT_SELECTED_ENTITIES,
  SET_NOT_REPORTED_LIST,
  SET_INIT_ENTITIES_DATA
} from '../constants';
import {
  setValidationStart,
  setValidationSuccess,
  setValidationError,
  setValidationInit
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

const initEntitiesData = () => ({
  type: SET_INIT_ENTITIES_DATA
})

export const setInitSelectedEntities = () => ({
  type: SET_INIT_SELECTED_ENTITIES
})

export const selectEntity = (entity) => ({
  type: SET_SELECTED_ENTITIES,
  payload: entity
})

export const setSelectedEntities = entity => {
  return (dispatch, getState) => {
    const {entities} = getState().validation;

    batch(() => {
      if (entities.status === 'success') {
        dispatch(setValidationInit('entities'));
      }

      dispatch(selectEntity(entity));
    })
  }
}

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

export const setNotReportedList = (list) => ({
  type: SET_NOT_REPORTED_LIST,
  payload: list
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

    batch(() => {
      dispatch(initEntitiesData());
      dispatch(setValidationStart('entities'));
    })

    MigrationService
      .post(`/migration-job/${id}/entities/validate-entities${query}`, body)
      .then(({validationResult, reports}) => {
        console.log(
          reports
          .filter(report => !SelectedEntities.includes(report.logicalName))
        )
        const notReportedList = reports
          .filter(report => !SelectedEntities.includes(report.logicalName))
          .map(item => item.logicalName);
        const newEntities = modifyEntities(currentEntities, reports);
        
        batch(() => {
          if (validationResult) {
            dispatch(setValidationSuccess('entities', 'Validation successful. No compatibility issues detected. Press “Next” to go further.'));
          } else {
            dispatch(setValidationError('entities', 'Detected compatibility issues with target environment'));
          }
          dispatch(fetchEntitiesSuccess(newEntities))
          dispatch(setReports(reports));
          dispatch(setNotReportedList(notReportedList))
        })
      })
  }
}