import {
    SET_CURRENT_STEP,
    SETTINGS_INIT_STARTED,
    SETTINGS_INIT_SUCCESS,
} from '../constants'

const INITIAL_STATE = {
    loading: true,
    currentStep: null
}

function stepsSettingsReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SETTINGS_INIT_STARTED:
            return {
                ...state,
                loading: true
            }
        case SETTINGS_INIT_SUCCESS:
            return {
                ...state,
                loading: false,
                currentStep: 'summary'//action.payload
            }
        case SET_CURRENT_STEP:
            return {
                ...state,
                currentStep: action.payload
            }
        default:
            return state
    }
}

export default stepsSettingsReducer;