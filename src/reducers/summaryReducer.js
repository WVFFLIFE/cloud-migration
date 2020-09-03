import {
  SET_CURRENT_DATE,
  SET_CURRENT_TIME,
  SET_TIMEZONE,
  FINISH_MIGRATION_START,
  FINISH_MIGRATION_OVER,
  FETCH_SUMMARY_STARTED,
  FETCH_SUMMARY_SUCCESS
} from '../constants'

const INITIAL_STATE = {
  getLoading: false,
  postLoading: false,
  date: new Date(),
  time: null,
  timezone: 'Etc/GMT-0'
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_DATE:
      return {
        ...state,
        date: action.payload
      }
    case SET_CURRENT_TIME:
      return {
        ...state,
        time: action.payload
      }
    case SET_TIMEZONE:
      return {
        ...state,
        timezone: action.payload
      }
    case FINISH_MIGRATION_START:
      return {
        ...state,
        postLoading: true
      }
    case FINISH_MIGRATION_OVER:
      return {
        ...state,
        postLoading: false
      }
    case FETCH_SUMMARY_STARTED:
      return {
        ...state,
        getLoading: true
      }
    case FETCH_SUMMARY_SUCCESS:
      return {
        ...state,
        date: action.payload.date,
        time: action.payload.time,
        timezone: action.payload.timezone,
        getLoading: false,
      }
    default:
      return state
  }
}