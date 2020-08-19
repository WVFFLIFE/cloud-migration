import {
  SET_VALIDATION_INIT,
  SET_VALIDATION_START,
  SET_VALIDATION_SUCCESS,
  SET_VALIDATION_ERROR,
  SET_ALL_VALIDATION_INIT
} from '../constants'

function createInitialState(list) {
  return list.reduce((acc, next) => {
    acc[next] = { status: 'hidden', message: '' };
    return acc;
  }, {});
}

const INITIAL_STATE = createInitialState(
  [
    'environments', 'sourceenvironment', 'targetenvironment', 'entities',
    'map', 'mapusers', 'mapbusinessunits', 'mapteams', 'summary'
  ]
)

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_VALIDATION_START:
      return {
        ...state,
        [action.payload.step]: {
          status: 'loading',
          message: '',
        }
      }
    case SET_VALIDATION_SUCCESS:
      return {
        ...state,
        [action.payload.step]: {
          status: 'success',
          message: action.payload.message,
          ...action.payload.other
        }
      }
    case SET_VALIDATION_ERROR:
      return {
        ...state,
        [action.payload.step]: {
          status: 'error',
          message: action.payload.message
        }
      }
    case SET_VALIDATION_INIT:
      return {
        ...state,
        [action.payload.step]: {
          status: 'hidden',
          message: ''
        }
      }
    case SET_ALL_VALIDATION_INIT: {
      return [
        'environments', 'sourceenvironment', 'targetenvironment', 'entities',
        'map', 'mapusers', 'mapbusinessunits', 'mapteams', 'summary'
      ].reduce((acc, next) => {
        acc[next] = { status: 'hidden', message: '' };
        return acc;
      }, {});
    }
    default:
      return state
  }
}