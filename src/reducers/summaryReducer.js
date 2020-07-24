import {
  SET_CURRENT_DATE,
  SET_CURRENT_TIME,
  SET_TIMEZONE,
  FINISH_MIGRATION_START,
  FINISH_MIGRATION_SUCCESS
} from '../constants'

const INITIAL_STATE = {
  loading: false,
  date: new Date(),
  time: new Date(),
  timezone: 'Etc/GMT-0'
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
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
        loading: true
      }
    case FINISH_MIGRATION_SUCCESS:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}