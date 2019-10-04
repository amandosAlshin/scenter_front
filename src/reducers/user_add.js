import {DEFAULT,SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR} from '../constants'
const initialState = {
  errorserver: {status: false,msg: false},
  loading: false,
  success: {status: false,msg: false}
}
const user_add =(state = initialState, action)=> {
  switch (action.type) {
    case DEFAULT+'USER_ADD':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: false,
        success: {status: false,msg: false},
      }
    case SERVER_DISPATCH+'USER_ADD':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: true,
        success: {status: false,msg: false},
      }

    case DISPATCH_SUCCESS+'USER_ADD':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: false,
        success: {status: true,msg: action.msg},
      }

    case DISPATCH_ERROR+'USER_ADD':
      return {
        ...state,
        errorserver: {status: true,msg: action.msg},
        loading: false,
        success:  {status: false,msg: false},
      }
    default:
      return state
  }
}
export default user_add
