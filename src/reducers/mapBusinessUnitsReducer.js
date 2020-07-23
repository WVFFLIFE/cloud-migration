import {
  FETCH_BUSINESS_UNITS_STARTED,
  FETCH_BUSSINESS_UNITS_SUCCESS,
  SET_TARGET_BUSINESS_UNITS,
  REMOVE_BUSINESS_TARGET_FROM_SOURCE,
  USE_BUSINESS_AUTOMAP,
  SET_TO_BUSINESS_TARGET
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
        data: {
          ...action.payload,
          mapedSourceBusinessUnits: action.payload.sourceBusinessUnits.map(sourceUserItem => {
            const mapedSource = action.payload.mapedBusinessUnits.find(mapedItem => mapedItem.source === sourceUserItem.source.guid);

            if (mapedSource) {
              const target = action.payload.targetBusinessUnits.find(targetItem => targetItem.guid === mapedSource.target);
              return {
                source: sourceUserItem.source,
                target
              }
            }

            return {
              source: sourceUserItem.source,
              target: null
            }
          }),
          mapedTargetBusinessUnits: action.payload.targetBusinessUnits.filter(item => {
            return !action.payload.mapedBusinessUnits.some(mapedItem => mapedItem.target === item.guid)
          })
        },
        loading: false
      }
    case SET_TARGET_BUSINESS_UNITS:
      return {
        ...state,
        data: {
          ...state.data,
          targetBusinessUnits: state.data.targetBusinessUnits.filter(item => item.guid !== action.payload.target.guid),
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
            .map((item, idx) => ({
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
          targetBusinessUnits: state.data.targetBusinessUnits.concat(action.payload),
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
          sourceBusinessUnits: state.data.mapedSourceBusinessUnits,
          targetBusinessUnits: state.data.mapedTargetBusinessUnits
        }
      }
    case SET_TO_BUSINESS_TARGET:
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
          }),
          targetBusinessUnits: action.payload.items
        }
      }

    default:
      return state
  }
}

export default mapBusinessUnitsReducer;