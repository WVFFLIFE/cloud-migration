import {
  FETCH_USERS_STARTED,
  FETCH_USERS_SUCCESS,
  SET_TARGET_USER,
  REMOVE_TARGET_FROM_SOURCE,
  USE_AUTOMAP,
  SET_TO_TARGET
} from '../constants';

const INITIAL_STATE = {
  data: {
    sourceUsers: [],
    targetUsers: [],
    mapedUsers: {}
  },
  loading: false
}

const mapUsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS_STARTED:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: {
          ...action.payload,
          mapedSourceUsers: action.payload.sourceUsers.map(sourceUserItem => {
            const mapedSource = action.payload.mapedUsers.find(mapedItem => mapedItem.source === sourceUserItem.source.guid);

            if (mapedSource) {
              const target = action.payload.targetUsers.find(targetItem => targetItem.guid === mapedSource.target);
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
          mapedTargetUsers: action.payload.targetUsers.filter(item => {
            return !action.payload.mapedUsers.some(mapedItem => mapedItem.target === item.guid)
          })
        },
        loading: false
      }
    case SET_TARGET_USER:
      return {
        ...state,
        data: {
          ...state.data,
          targetUsers: state.data.targetUsers.filter(item => item.guid !== action.payload.target.guid),
          sourceUsers: state.data.sourceUsers
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
    case REMOVE_TARGET_FROM_SOURCE:
      return {
        ...state,
        data: {
          ...state.data,
          targetUsers: state.data.targetUsers.concat(action.payload),
          sourceUsers: state.data.sourceUsers.map(item => {
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
    case SET_TO_TARGET:
      return {
        ...state,
        data: {
          ...state.data,
          sourceUsers: state.data.sourceUsers.map(item => {
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
          targetUsers: action.payload.items
        }
      }
    case USE_AUTOMAP:
      return {
        ...state,
        data: {
          ...state.data,
          sourceUsers: state.data.mapedSourceUsers,
          targetUsers: state.data.mapedTargetUsers
        }
      }

    default:
      return state
  }
}

export default mapUsersReducer;