import {
  SET_CURRENT_STEP,
  SETTINGS_INIT_STARTED,
  SETTINGS_INIT_SUCCESS,
  SET_EDIT_ABILITY,
  SET_STEP_CONTROL_STATUS
} from '../constants'

const INITIAL_STATE = {
  loading: true,
  currentStep: null,
  currentStatus: null,
  canEdit: true,
  stepControlStatus: 'hidden'
}

function stepsSettingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETTINGS_INIT_STARTED:
      return {
        ...state,
        loading: true
      }
    case SETTINGS_INIT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentStep: 'summary',//action.payload.step, // change to set custom step for debug
        currentStatus: action.payload.status
      }
    case SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload
      }
    case SET_EDIT_ABILITY:
      return {
        ...state,
        canEdit: action.payload
      }
    case SET_STEP_CONTROL_STATUS:
      return {
        ...state,
        stepControlStatus: action.payload
      }
    default:
      return state
  }
}

export default stepsSettingsReducer;