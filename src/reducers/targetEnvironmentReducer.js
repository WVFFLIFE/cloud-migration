import {
  FETCH_TARGETENVIRONMENT_DATA_STARTED,
  FETCH_TARGETENVIRONMENT_DATA_SUCCESS,
  SET_TARGETENVIRONMENT_DATA,
  SET_INIT_TARGETENVIRONMENT
} from '../constants';

const INITIAL_STATE = {
  loading: false,
  data: {
    Url: '',
    User: '',
    Password: ''
  }
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TARGETENVIRONMENT_DATA_STARTED:
      return {
        ...state,
        loading: true
      }
    case FETCH_TARGETENVIRONMENT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          ...action.payload,
          Password: ''
        }
      }
    case SET_TARGETENVIRONMENT_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      }
    case SET_INIT_TARGETENVIRONMENT:
      return {
        ...state,
        data: {
          Url: '',
          User: '',
          Password: ''
        }
      }
    default:
      return state
  }
}