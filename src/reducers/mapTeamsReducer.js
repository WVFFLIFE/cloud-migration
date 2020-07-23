import {
  FETCH_TEAMS_STARTED,
  FETCH_TEAMS_SUCCESS,
  SET_TARGET_TEAMS,
  REMOVE_TEAMS_TARGET_FROM_SOURCE,
  SET_TO_TEAMS_TARGET,
  USE_TEAMS_AUTOMAP
} from '../constants';

const INITIAL_STATE = {
  data: {
    sourceTeams: [],
    targetTeams: [],
    mapedTeams: {}
  },
  loading: true
}

const mapTeamsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TEAMS_STARTED:
      return {
        ...state,
        loading: true
      }
    case FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        data: {
          ...action.payload,
          mapedSourceTeams: action.payload.sourceTeams.map(sourceUserItem => {
            const mapedSource = action.payload.mapedTeams.find(mapedItem => mapedItem.source === sourceUserItem.source.guid);

            if (mapedSource) {
              const target = action.payload.targetTeams.find(targetItem => targetItem.guid === mapedSource.target);
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
          mapedTargetTeams: action.payload.targetTeams.filter(item => {
            return !action.payload.mapedTeams.some(mapedItem => mapedItem.target === item.guid)
          })
        },
        loading: false
      }
    case SET_TARGET_TEAMS:
      return {
        ...state,
        data: {
          ...state.data,
          targetTeams: state.data.targetTeams.filter(item => item.guid !== action.payload.target.guid),
          sourceTeams: state.data.sourceTeams
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
    case REMOVE_TEAMS_TARGET_FROM_SOURCE:
      return {
        ...state,
        data: {
          ...state.data,
          targetTeams: state.data.targetTeams.concat(action.payload),
          sourceTeams: state.data.sourceTeams.map(item => {
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
    case USE_TEAMS_AUTOMAP:
      return {
        ...state,
        data: {
          ...state.data,
          sourceTeams: state.data.mapedSourceTeams,
          targetTeams: state.data.mapedTargetTeams
        }
      }
    case SET_TO_TEAMS_TARGET:
      return {
        ...state,
        data: {
          ...state.data,
          sourceTeams: state.data.sourceTeams.map(item => {
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
          targetTeams: action.payload.items
        }
      }

    default:
      return state
  }
}

export default mapTeamsReducer;