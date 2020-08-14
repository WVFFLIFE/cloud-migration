import {
  SET_CURRENT_DATE,
  SET_CURRENT_TIME,
  SET_TIMEZONE,
  FINISH_MIGRATION_START,
  FINISH_MIGRATION_SUCCESS,
  FETCH_SUMMARY_STARTED,
  FETCH_SUMMARY_SUCCESS
} from '../constants'

const INITIAL_STATE = {
  getLoading: false,
  postLoading: false,
  date: new Date(),
  time: {h: 9, m: 0},
  timezone: 'Etc/GMT-0'
}

export default function (state = INITIAL_STATE, action) {
  if (action.type === SET_CURRENT_DATE) {
    console.log(action.payload);
  }
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
    case FINISH_MIGRATION_SUCCESS:
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