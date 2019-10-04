import {SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR} from '../constants'
const initialState = {
  errorserver: {status: false,msg: false},
  loading: false,
  success: {status: false,data: []},
}
const queue_list =(state = initialState, action)=> {
  switch (action.type) {
    case SERVER_DISPATCH+'QUEUE_LIST':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: true,
        success: {status: false,data: []},

      }

    case DISPATCH_SUCCESS+'QUEUE_LIST':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: false,
        success: {status: true,data: action.data},
      }

    case DISPATCH_ERROR+'QUEUE_LIST':
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
export default queue_list
