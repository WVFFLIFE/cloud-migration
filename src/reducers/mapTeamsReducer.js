import {
  FETCH_TEAMS_STARTED,
  FETCH_TEAMS_SUCCESS,
  SET_TARGET_TEAMS,
  REMOVE_TEAMS_TARGET_FROM_SOURCE,
  USE_TEAMS_AUTOMAP,
  CLEAR_TARGET_TEAMS,
  AUTOMAP_TEAMS
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
        data: action.payload,
        loading: false
      }
    case SET_TARGET_TEAMS:
      return {
        ...state,
        data: {
          ...state.data,
          sourceTeams: state.data.sourceTeams
            .map(item => {
              return {
                ...item,
                target: item.source.guid === action.payload.sourceId ? action.payload.target : item.target
              }
            })
        }
      }
    case REMOVE_TEAMS_TARGET_FROM_SOURCE:
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
          })
        }
      }
    case USE_TEAMS_AUTOMAP:
      return {
        ...state,
        data: {
          ...state.data,
          sourceTeams: action.payload
        }
      }
    case AUTOMAP_TEAMS:
      return {
        ...state,
        data: {
          ...state.data,
          sourceTeams: state.data.sourceTeams.map(sourceTeam => {
            let target = sourceTeam.target;
             const mapedSourceTeam = state.data.mapedTeams.find(mapedTeam => mapedTeam.source === sourceTeam.source.guid) || null;

            if (mapedSourceTeam && !target) {
              target = state.data.targetTeams.find(targetTeam => targetTeam.guid === mapedSourceTeam.target) || null;
            }

            return {
              source: sourceTeam.source,
              target
            }
          })
        }
      }
    case CLEAR_TARGET_TEAMS:
      return {
        ...state,
        data: {
          ...state.data,
          sourceTeams: state.data.sourceTeams.map(item => ({ ...item, target: null })) 
        }
      }
    default:
      return state
  }
}

export default mapTeamsReducer;