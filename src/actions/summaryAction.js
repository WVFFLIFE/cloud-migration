import {
  SET_CURRENT_DATE,
  SET_CURRENT_TIME,
  SET_TIMEZONE,
  FINISH_MIGRATION_START,
  FINISH_MIGRATION_SUCCESS
} from '../constants'
import MigrationService from '../services/migration.services'; 

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

export const finishMigration = (id, scheduledDate) => {
  return dispatch => {
    dispatch(finishMigrationStart());

    MigrationService
      .post(`/migration-job/${id}/summary`, {scheduledDate})
      .then(() => dispatch(finishMigrationSuccess()))
  }
}