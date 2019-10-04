import {SERVER_DISPATCH,UPDATE_SERVER,DISPATCH_SUCCESS,DISPATCH_ERROR} from '../constants'
const initialState = {
  errorserver: {status: false,msg: false},
  update: false,
  loading: false,
  success: {status: false,data: []},
}
const window_state =(state = initialState, action)=> {
  switch (action.type) {
    case UPDATE_SERVER+'WINDOW_STATE':
      return {
        ...state,
        update: true,
        success: {status: true,data: action.data},

      }
    case SERVER_DISPATCH+'WINDOW_STATE':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: true,
        success: {status: false,data: []},

      }

    case DISPATCH_SUCCESS+'WINDOW_STATE':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: false,
        success: {status: true,data: action.data},
      }

    case DISPATCH_ERROR+'WINDOW_STATE':
      return {
        ...state,
        errorserver: {status: true,msg: action.msg},
        loading: false,
        success: {status: false,data: []},
      }
    default:
      return state
  }
}
export default window_state
