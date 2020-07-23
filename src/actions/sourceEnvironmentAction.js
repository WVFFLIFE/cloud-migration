import {
  FETCH_SOURCEENVIRONMENT_DATA_STARTED,
  FETCH_SOURCEENVIRONMENT_DATA_SUCCESS,
  SET_SOURCEENVIRONMENT_DATA
} from '../constants';
import MigrationService from '../services/migration.services';

const fetchSourceEnvironmentDataStarted = () => ({
  type: FETCH_SOURCEENVIRONMENT_DATA_STARTED
})

const fetchSourceEnvironmentDataSuccess = (payload) => ({
  type: FETCH_SOURCEENVIRONMENT_DATA_SUCCESS,
  payload
})

export const setSourceEnvironmentData = (payload) => ({
  type: SET_SOURCEENVIRONMENT_DATA,
  payload
})

export const fetchSourceEnvironmentData = (id) => {
  return dispatch => {
    dispatch(fetchSourceEnvironmentDataStarted())

    MigrationService
      .get(`/migration-job/${id}/source-environment`)
      .then(data => {
        dispatch(fetchSourceEnvironmentDataSuccess({
          Url: data.sourceEnvironmentUrl || '',
          User: data.sourceEnvironmentUser
        }))
      })
  }
}