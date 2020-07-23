import {
  FETCH_TARGETENVIRONMENT_DATA_STARTED,
  FETCH_TARGETENVIRONMENT_DATA_SUCCESS,
  SET_TARGETENVIRONMENT_DATA
} from '../constants';
import MigrationService from '../services/migration.services';

const fetchTargetEnvironmentDataStarted = () => ({
  type: FETCH_TARGETENVIRONMENT_DATA_STARTED
})

const fetchTargetEnvironmentDataSuccess = (payload) => ({
  type: FETCH_TARGETENVIRONMENT_DATA_SUCCESS,
  payload
})

export const setTargetEnvironmentData = (payload) => ({
  type: SET_TARGETENVIRONMENT_DATA,
  payload
})

export const fetchTargetEnvironmentData = (id) => {
  return dispatch => {
    dispatch(fetchTargetEnvironmentDataStarted())

    MigrationService
      .get(`/migration-job/${id}/target-environment`)
      .then(data => {
        dispatch(fetchTargetEnvironmentDataSuccess({
          Url: data.targetEnvirnomentUri || '',
          User: data.targetEnvirnomentUser
        }))
      })
  }
}