import {
  FETCH_BUSINESS_UNITS_STARTED,
  FETCH_BUSSINESS_UNITS_SUCCESS,
  SET_TARGET_BUSINESS_UNITS,
  REMOVE_BUSINESS_TARGET_FROM_SOURCE,
  USE_BUSINESS_AUTOMAP,
} from '../constants';

const INITIAL_STATE = {
  data: {
    sourceBusinessUnits: [],
    targetBusinessUnits: [],
    mapedBusinessUnits: {}
  },
  loading: true
}

const mapBusinessUnitsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BUSINESS_UNITS_STARTED:
      return {
        ...state,
        loading: true
      }
    case FETCH_BUSSINESS_UNITS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    case SET_TARGET_BUSINESS_UNITS:
      return {
        ...state,
        data: {
          ...state.data,
          sourceBusinessUnits: state.data.sourceBusinessUnits
            .map(item => {
              if (item.target && item.target.guid === action.payload.target.guid) {
                return {
                  source: item.source,
                  target: null
                }
              }
              return item;
            })
            .map(item => ({
              source: item.source,
              target: item.source.guid === action.payload.sourceId ? action.payload.target : item.target
            }))
        }
      }
    case REMOVE_BUSINESS_TARGET_FROM_SOURCE:
      return {
        ...state,
        data: {
          ...state.data,
          sourceBusinessUnits: state.data.sourceBusinessUnits.map(item => {
            if (item.target && item.target.guid === action.payload.guid) {
              return {
                source: item.source,
                target: null
              }
            }

            return {
              source: item.source,
              target: item.target
            }
          })
        }
      }
    case USE_BUSINESS_AUTOMAP:
      return {
        ...state,
        data: {
          ...state.data,
          sourceBusinessUnits: action.payload
        }
      }
    default:
      return state
  }
}

export default mapBusinessUnitsReducer;