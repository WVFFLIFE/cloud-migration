import {
  FETCH_USERS_STARTED,
  FETCH_USERS_SUCCESS,
  SET_TARGET_USER,
  REMOVE_TARGET_FROM_SOURCE,
  USE_AUTOMAP
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
        },
        loading: false
      }
    case SET_TARGET_USER:
      return {
        ...state,
        data: {
          ...state.data,
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
    case USE_AUTOMAP:
      return {
        ...state,
        data: {
          ...state.data,
          sourceUsers: action.payload
        }
      }

    default:
      return state
  }
}

export default mapUsersReducer;