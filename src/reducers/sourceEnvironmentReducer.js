import {
    FETCH_SOURCEENVIRONMENT_DATA_STARTED,
    FETCH_SOURCEENVIRONMENT_DATA_SUCCESS,
    SET_SOURCEENVIRONMENT_DATA
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
    switch(action.type) {
        case FETCH_SOURCEENVIRONMENT_DATA_STARTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_SOURCEENVIRONMENT_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    ...action.payload
                }
            }
        case SET_SOURCEENVIRONMENT_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload
                }
            }
        default:
            return state
    }
}