import {DEFAULT,SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR} from '../constants'
const initialState = {
  errorserver: {status: false,msg: false},
  loading: false,
  success: {status: false,data: []},
}
const user_check =(state = initialState, action)=> {
  switch (action.type) {
    case DEFAULT+'USER':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: false,
        success: {status: false,data: false},
      }
    case SERVER_DISPATCH+'USER':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: true,
        success: {status: false,data: []},
      }

    case DISPATCH_SUCCESS+'USER':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: false,
        success: {status: true,data: action.user_app}
      }

    case DISPATCH_ERROR+'USER':
      return {
        ...state,
        errorserver: {status: true,msg: action.msg},
        loading: false,
        success: {status: false,data: []}
      }
    default:
      return state
  }
}
export default user_check
