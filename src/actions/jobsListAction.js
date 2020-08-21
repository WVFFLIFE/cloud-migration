import {
  FETCH_JOBS_STARTED,
  FETCH_JOBS_SUCCESS,
  DELETE_JOB_STARTED,
  DELETE_JOB_SUCCESS,
  ADD_JOB_STARTED,
  ADD_JOB_SUCCESS
} from '../constants';
import MigrationService from '../services/migration.services';

const fetchJobsStarted = () => ({
  type: FETCH_JOBS_STARTED
})

const fetchJobsSuccess = (list) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: list
})

const addJobStarted = () => ({
  type: ADD_JOB_STARTED
})

const addJobSuccess = () => ({
  type: ADD_JOB_SUCCESS
})

const deleteJobStarted = () => ({
  type: DELETE_JOB_STARTED
})

const deleteJobSuccess = (list) => ({
  type: DELETE_JOB_SUCCESS,
  payload: list
})

export const addNewJob = (pushTo) => {
  return dispatch => {
    dispatch(addJobStarted());

    MigrationService
      .post()
      .then(({jobId}) => {
        dispatch(addJobSuccess());
        pushTo(`/migrationjob/${jobId}`);
      })
  }
}

export const deleteCurrentJob = (id) => {
  return (dispatch, getState) => {
    dispatch(deleteJobStarted());

    MigrationService
      .delete(`/${id}`)
      .then(() => {
        const newList = getState().jobsValue.data.filter(item => item.id !== id);
        dispatch(deleteJobSuccess(newList))
      })
    }
}

export const fetchJobsList = (loading) => {
  return dispatch => {
    if (!loading) {
      dispatch(fetchJobsStarted());
    }

    MigrationService.get()
      .then(data => {
        let modifiedData = data.map(item => {
          return {
            ...item,
            notifications: item.notifications.join('. ')
          }
        })

        dispatch(fetchJobsSuccess(modifiedData))
      })
  }
}