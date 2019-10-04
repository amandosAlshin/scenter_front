import { combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import ticket_list from './ticket_list'
import queue_list from './queue_list'
import branch_list from './branch_list'
import employee_list from './employee_list'
import user_add from './user_add'
import user_list from './user_list'
import user_info from './user_info'
import login from './login'
import user_check from './user_check'
import user_delete from './user_delete'
import filter from './filter'
import employee_group_add from './employee_group_add'
import employee_group_list from './employee_group_list'
import window_state from './window_state'
import role_list from './role-list'
import { reducer as formReducer } from 'redux-form'
const reducers = combineReducers({
  router: routerReducer,
  form: formReducer,
  ticket_list: ticket_list,
  queue_list: queue_list,
  branch_list: branch_list,
  employee_list: employee_list,
  user_add: user_add,
  user_list: user_list,
  user_info: user_info,
  login: login,
  user_check: user_check,
  user_delete: user_delete,
  filter: filter,
  employee_group_add: employee_group_add,
  employee_group_list: employee_group_list,
  window_state: window_state,
  role_list: role_list
})

export default reducers
