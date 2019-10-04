import {DEFAULT,SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR} from '../constants'
const initialState = {
  errorserver: {status: false,msg: false},
  loading: false,
  success: {status: false,msg: false}
}
const employee_group_add =(state = initialState, action)=> {
  switch (action.type) {
    case DEFAULT+'GROUP_EMPLOYEE_ADD':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: false,
        success: {status: false,msg: false},
      }
    case SERVER_DISPATCH+'GROUP_EMPLOYEE_ADD':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: true,
        success: {status: false,msg: false},
      }

    case DISPATCH_SUCCESS+'GROUP_EMPLOYEE_ADD':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: false,
        success: {status: true,msg: action.msg},
      }

    case DISPATCH_ERROR+'GROUP_EMPLOYEE_ADD':
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
export default employee_group_add
