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
import {parseFromTimeZone} from 'date-fns-timezone';

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
        const parsedDate = scheduledDate && timeZone ? new Date(parseFromTimeZone(scheduledDate, {timeZone})) : new Date();
        const time = scheduledDate ? {h: new Date(parsedDate).getHours(), m: new Date(parsedDate).getMinutes()} : {h: 9, m: 0}
        dispatch(
          fetchSummarySuccess({
            date: scheduledDate ? parsedDate: new Date(),
            time,
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

    const scheduledDate = getScheduledDate(date, time, timezone);

    console.log(scheduledDate);

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