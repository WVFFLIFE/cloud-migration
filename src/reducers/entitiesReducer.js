import {
  FETCH_ENTITIES_DATA_STARTED,
  FETCH_ENTITIES_DATA_SUCCESS,
  SET_CURRENT_PAGE,
  SET_ORDER,
  SET_ORDER_BY,
  SET_TOTAL_ITEMS,
  SET_REPORTS
} from '../constants';

const INITIAL_STATE = {
  data: [],
  reports: [],
  loading: true,
  currentPage: 0,
  itemsPerPage: 18,
  totalItems: 0,
  order: 'asc',
  orderBy: 'displayName',
  nextStatus: 'hidden'
}

const entitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ENTITIES_DATA_STARTED:
      return {
        ...state,
        loading: true
      }
    case FETCH_ENTITIES_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    case SET_ORDER:
      return {
        ...state,
        order: action.payload
      }
    case SET_ORDER_BY:
      return {
        ...state,
        orderBy: action.payload
      }
    case SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload
      }
    case SET_REPORTS:
      return {
        ...state,
        reports: action.payload
      }
    default:
      return state;
  }
}

export default entitiesReducer;