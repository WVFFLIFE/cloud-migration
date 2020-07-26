import {batch} from 'react-redux';
import {
  SET_CURRENT_DATE,
  SET_CURRENT_TIME,
  SET_TIMEZONE,
  FINISH_MIGRATION_START,
  FINISH_MIGRATION_SUCCESS,
  FETCH_SUMMARY_STARTED,
  FETCH_SUMMARY_SUCCESS
} from '../constants';
import {
  setValidationSuccess,
  setStepControlStatus
} from '../actions';
import MigrationService from '../services/migration.services';
import {getScheduledDate} from '../helpers';

export const setCurrentDate = (date) => ({
  type: SET_CURRENT_DATE,
  payload: date
})

export const setCurrentTime = (time) => ({
  type: SET_CURRENT_TIME,
  payload: time
})

export const setTimeZone = (timezone) => ({
  type: SET_TIMEZONE,
  payload: timezone
})

const finishMigrationStart = () => ({
  type: FINISH_MIGRATION_START
})

const finishMigrationSuccess = () => ({
  type: FINISH_MIGRATION_SUCCESS
})

const fetchSummaryStarted = () => ({
  type: FETCH_SUMMARY_STARTED
})

const fetchSummarySuccess = (data) => ({
  type: FETCH_SUMMARY_SUCCESS,
  payload: data
})

export const fetchSummaryData = (id) => {
  return dispatch => {
    dispatch(fetchSummaryStarted());

    MigrationService
      .get(`/migration-job/${id}/summary`)
      .then(({scheduledDate, timeZone}) => {
        dispatch(
          fetchSummarySuccess({
            date: scheduledDate ? new Date(scheduledDate) : new Date(),
            timezone: timeZone || 'Etc/GMT-0'
          })
        )
      })
  }
} 

export const finishMigration = (id) => {
  return (dispatch, getState) => {
    dispatch(finishMigrationStart());
    const {date, time, timezone} = getState().summary;

    dispatch(setStepControlStatus('loading'));

    const scheduledDate = getScheduledDate(date, time, timezone)

    MigrationService
      .postStep(`/migration-job/${id}/summary`, {scheduledDate, timeZone: timezone})
      .then(() => {
        batch(() => {
          dispatch(setStepControlStatus('success'));
          dispatch(finishMigrationSuccess());
          dispatch(setValidationSuccess('summary'))
        })
      })
      .catch(() => {
        dispatch(setStepControlStatus('error'));
      })
  }
}