import {
  FETCH_ENTITIES_DATA_STARTED,
  FETCH_ENTITIES_DATA_SUCCESS,
  SET_CURRENT_PAGE,
  SET_ORDER,
  SET_ORDER_BY,
  SET_TOTAL_ITEMS,
  SET_REPORTS,
  SET_SELECTED_ENTITIES,
  SET_INIT_SELECTED_ENTITIES,
  SET_INIT_ENTITIES,
  SET_NOT_REPORTED_LIST,
  SET_INIT_ENTITIES_DATA
} from '../constants';

const INITIAL_STATE = {
  data: [],
  reports: [],
  notReportedList: [],
  selectedEntities: [],
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
        reports: action.payload,
        selectedEntities: state.selectedEntities.filter(entity => {
          const withError = action.payload.some(item => item.logicalName === entity && item.errors.length);
          return !withError
        }),
      }
    case SET_SELECTED_ENTITIES:
      return {
        ...state,
        selectedEntities: state.selectedEntities.includes(action.payload) 
          ? state.selectedEntities.filter(item => item !== action.payload)
          : [...state.selectedEntities, action.payload]
      }
    case SET_INIT_SELECTED_ENTITIES:
      return {
        ...state,
        selectedEntities: []
      }
    case SET_NOT_REPORTED_LIST:
      return {
        ...state,
        notReportedList: action.payload
      }
    case SET_INIT_ENTITIES:
      return {
        data: [],
        reports: [],
        notReportedList: [],
        selectedEntities: [],
        loading: true,
        currentPage: 0,
        itemsPerPage: 18,
        totalItems: 0,
        order: 'asc',
        orderBy: 'displayName',
        nextStatus: 'hidden'
      }
    case SET_INIT_ENTITIES_DATA:
      return {
        ...state,
        data: state.data.map(item => ({
          displayName: item.displayName,
          description: item.description,
          logicalName: item.logicalName,
          validationSettings: {status: 'hidden', message: ''}
        }))
      }
    default:
      return state;
  }
}

export default entitiesReducer;