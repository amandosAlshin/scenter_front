import {SERVER_DISPATCH,UPDATE_SERVER,DISPATCH_SUCCESS,DISPATCH_ERROR} from '../constants'
const initialState = {
  errorserver: {status: false,msg: false},
  update: false,
  loading: false,
  success: {status: false,data: []},
}
const ticket_list =(state = initialState, action)=> {
  switch (action.type) {
    case UPDATE_SERVER+'TICKET_LIST':
      return {
        ...state,
        update: true,
        success: {status: true,data: action.data},

      }
    case SERVER_DISPATCH+'TICKET_LIST':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: true,
        success: {status: false,data: []},

      }

    case DISPATCH_SUCCESS+'TICKET_LIST':
      return {
        ...state,
        errorserver: {status: false,msg: false},
        loading: false,
        success: {status: true,data: action.data},
      }

    case DISPATCH_ERROR+'TICKET_LIST':
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
export default ticket_list
