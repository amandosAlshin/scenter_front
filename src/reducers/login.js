import {DEFAULT,SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR} from '../constants'
const initialState = {
  errorserver: {status: false,msg: false},
  loading: false,
  success: {status: false,data: []},
}
const login =(state = initialState, action)=> {
  switch (action.type) {
    case DEFAULT+'LOGIN':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: false,
        success: {status: false,data: false},
      }
    case SERVER_DISPATCH+'LOGIN':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: true,
        success: {status: false,data: []},

      }

    case DISPATCH_SUCCESS+'LOGIN':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: false,
        success: {status: true,data: action.data},
      }

    case DISPATCH_ERROR+'LOGIN':
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
export default login
