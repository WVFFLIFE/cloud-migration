import {
  FETCH_ENTITIES_DATA_STARTED,
  FETCH_ENTITIES_DATA_SUCCESS,
  SET_REPORTS,
  SET_SELECTED_ENTITIES,
  SET_INIT_SELECTED_ENTITIES,
  SET_INIT_ENTITIES,
  SET_INIT_ENTITIES_DATA,
  SET_TAB,
} from '../constants';

const INITIAL_STATE = {
  data: [],
  reports: [],
  selectedEntities: {
    CoreRecords: [],
    MarketingAndSales: [],
    Service: [],
    Miscellaneous: [],
    CustomEntities: []
  },
  loading: true,
  currentTab: 'CoreRecords',
  nextStatus: 'hidden',
}

const entitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ENTITIES_DATA_STARTED:
      return {
        ...state,
        data: [],
        reports: [],
        selectedEntities: {
          CoreRecords: [],
          MarketingAndSales: [],
          Service: [],
          Miscellaneous: [],
          CustomEntities: []
        },
        loading: true,
        currentTab: 'CoreRecords',
        nextStatus: 'hidden',
      }
    case FETCH_ENTITIES_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        selectedEntities: {
          ...state.selectedEntities,
          ...action.payload.selectedEntities
        }
      }
    case SET_REPORTS:
      return {
        ...state,
        reports: action.payload,
      }
    case SET_SELECTED_ENTITIES:
      return {
        ...state,
        selectedEntities: {
          ...state.selectedEntities,
          [state.currentTab]: action.payload
        }
      }
    case SET_INIT_SELECTED_ENTITIES:
      return {
        ...state,
        selectedEntities: {
          CoreRecords: [],
          MarketingAndSales: [],
          Service: [],
          Miscellaneous: [],
          CustomEntities: []
        }
      }
    case SET_INIT_ENTITIES:
      return {
        data: [],
        reports: [],
        currentTab: 'CoreRecords',
        selectedEntities: {
          CoreRecords: [],
          MarketingAndSales: [],
          Service: [],
          Miscellaneous: [],
          CustomEntities: []
        },
        loading: true,
        nextStatus: 'hidden',
        isBack: false
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
    case SET_TAB:
      return {
        ...state,
        currentTab: action.payload
      }
    default:
      return state;
  }
}

export default entitiesReducer;