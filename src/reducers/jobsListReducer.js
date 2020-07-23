import {
    FETCH_JOBS_STARTED,
    FETCH_JOBS_SUCCESS,
    FETCH_JOBS_FAILURE,
    DELETE_JOB_STARTED,
    DELETE_JOB_SUCCESS,
    ADD_JOB_STARTED,
    ADD_JOB_SUCCESS
} from '../constants';

const INITIAL_STATE = {
    data: [],
    loading: true,
    error: false
}

function jobsListReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_JOBS_STARTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_JOBS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case FETCH_JOBS_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                error: true
            }
        case DELETE_JOB_STARTED:
            return {
                ...state,
                loading: true,
            }
        case DELETE_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case ADD_JOB_STARTED:
            return {
                ...state,
                loading: true
            }
        case ADD_JOB_SUCCESS:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default jobsListReducer;