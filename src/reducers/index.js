import { combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import ticket_list from './ticket_list'
import queue_list from './queue_list'
import branch_list from './branch_list'
import employee_list from './employee_list'
import user_add from './user_add'
import user_list from './user_list'
import user_info from './user_info'
import user_edit from './user_edit'
import camers_all_list from './camers_all_list'
import camera_list from './camera_list'
import camera_add from './camera_add'
import camera_info from './camera_info'
import camera_delete from './camera_delete'
import login from './login'
import user_check from './user_check'
import user_delete from './user_delete'
import filter from './filter'
import employee_group_add from './employee_group_add'
import employee_group_list from './employee_group_list'
import window_state from './window_state'
import role_list from './role-list'
import state_slaid from './state_slaid'
import column_count from './column_count'
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
  user_edit: user_edit,
  camera_list: camera_list,
  camers_all_list: camers_all_list,
  camera_delete: camera_delete,
  login: login,
  user_check: user_check,
  user_delete: user_delete,
  filter: filter,
  employee_group_add: employee_group_add,
  employee_group_list: employee_group_list,
  window_state: window_state,
  role_list: role_list,
  state_slaid: state_slaid,
  camera_add: camera_add,
  camera_info: camera_info,
  column_count: column_count
})

export default reducers
