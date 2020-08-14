import {
  FETCH_ENTITIES_DATA_STARTED,
  FETCH_ENTITIES_DATA_SUCCESS,
  SET_REPORTS,
  SET_SELECTED_ENTITIES,
  SET_INIT_SELECTED_ENTITIES,
  SET_INIT_ENTITIES,
  SET_INIT_ENTITIES_DATA,
  SET_TAB,
  SET_IS_BACK
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
  isBack: false
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
        selectedEntities: []
      }
    case SET_INIT_ENTITIES:
      return {
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
    case SET_TAB:
      return {
        ...state,
        currentTab: action.payload
      }
    case SET_IS_BACK:
      return {
        ...state,
        isBack: action.payload
      }
    default:
      return state;
  }
}

export default entitiesReducer;