import { batch } from 'react-redux';
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
import {httpClient} from '../services/migration.services';
import { getScheduledDate } from '../helpers';
import { parseFromTimeZone } from 'date-fns-timezone';

const setCurrentTimeAction = (time) => ({
  type: SET_CURRENT_TIME,
  payload: time
})

export const setCurrentTime = (time) => {
  return (dispatch) => {
    dispatch(setCurrentTimeAction(time))
  }
}

const setCurrentDateAction = (date) => ({
  type: SET_CURRENT_DATE,
  payload: date
})

export const setCurrentDate = (date) => {
  return (dispatch) => {
    batch(() => {
      dispatch(setCurrentTime(null));
      dispatch(setCurrentDateAction(date));
    })
  }
}

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

    httpClient
      .get(`/${id}/summary`)
      .then(({ scheduledDate, timeZone }) => {
        const parsedDate = scheduledDate && timeZone ? new Date(parseFromTimeZone(scheduledDate, { timeZone })) : new Date();
        const time = scheduledDate ? { h: new Date(parsedDate).getHours(), m: new Date(parsedDate).getMinutes() } : null
        dispatch(
          fetchSummarySuccess({
            date: scheduledDate ? parsedDate : new Date(),
            time,
            timezone: timeZone || 'Etc/GMT-0'
          })
        )
      })
  }
}

export const finishMigration = (id) => {
  return (dispatch, getState) => {
    const { date, time, timezone } = getState().summary;
    const cloneDate = new Date(date.getTime());
    cloneDate.setHours(time.h);
    cloneDate.setMinutes(time.m);

    if (cloneDate.getTime() < new Date().getTime()) {
      dispatch(setCurrentTime(null));
    } else {
      dispatch(finishMigrationStart());

      dispatch(setStepControlStatus('loading'));

      const scheduledDate = getScheduledDate(date, time, timezone);

      httpClient
        .post(`/${id}/summary`, { scheduledDate, timeZone: timezone })
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
}