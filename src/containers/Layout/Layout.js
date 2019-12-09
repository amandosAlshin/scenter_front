import DefaultLayout from '../../views/DefaultLayout';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {userCheckAction} from '../../actions/user_check'
import {TicketListAction} from '../../actions/ticket_list'
import {QueueListAction} from '../../actions/queue_list'
import {EmployeeListAction} from '../../actions/employee_list'
import {BranchListAction} from '../../actions/branch_list'
import { alarmNotification } from '../../selectors/alarm_notification'
import { branchUserFilter } from '../../selectors/branch_user_filter_list'
import { tenMinuteWaits } from '../../selectors/ten_minute_waits'
import {branchFilter} from '../../actions/filter'
import { EmployeeGroupAction } from '../../actions/employee_group_list'
import { WindowStatesAction } from '../../actions/window_state'
import { RoleListAction } from '../../actions/role_list'
import {checkKey} from '../../actions/checkKey'
import {itemSlaid} from '../../actions/item_slaid'
import {changeCount} from '../../actions/column_count'
const mapStateToProps = (state) => {
  return {
    //user check
    loading_user: state.user_check.loading,
    errorserver_user: state.user_check.errorserver,
    user_app: state.user_check.success,
    //ticket list
    loading_ticket_list: state.ticket_list.loading,
    errorserver_ticket_list: state.ticket_list.errorserver,
    ticket_success: state.ticket_list.success,
    //queue list
    loading_queue_list: state.queue_list.loading,
    errorserver_queue_list: state.queue_list.errorserver,
    queue_success: state.queue_list.success,
    //employee list
    loading_employee_list: state.employee_list.loading,
    errorserver_employee_list: state.employee_list.errorserver,
    employee_success: state.employee_list.success,
    //branch list
    loading_branch_list: state.branch_list.loading,
    errorserver_branch_list: state.branch_list.errorserver,
    branch_success: state.branch_list.success,

    //employee group list
    loading_empl_gr_list: state.employee_group_list.loading,
    errorserver_empl_gr_list: state.employee_group_list.errorserver,
    empl_gr_success: state.employee_group_list.success,

    //windows state list
    loading_window: state.window_state.loading,
    errorserver_window: state.window_state.errorserver,
    window_success: state.window_state.success,

    //role
    loading_role: state.role_list.loading,
    errorserver_role: state.role_list.errorserver,
    role_success: state.role_list.success,

    filter: state.filter.filter,
    //selectors
    alarm_notification: alarmNotification(state),
    branch_user_filter: branchUserFilter(state),
    ten_minute_waits: tenMinuteWaits(state),

    //slaids
    state_slaid: state.state_slaid,
    column_count: state.column_count,

  }
}

const mapDispatchToProps = (dispatch) => ({
  user_check: (token,history)=>{
      dispatch(userCheckAction(token,history));
  },
  ticketList: (history)=>{
      dispatch(TicketListAction(history));
  },
  queueList: ()=>{
    dispatch(QueueListAction());
  },
  employeeList: ()=>{
    dispatch(EmployeeListAction());
  },
  branchList: (data)=>{
    dispatch(BranchListAction(data));
  },
  branchFilter: (filial,branch)=>{
    dispatch(branchFilter(filial,branch))
  },
  employeeGroupList: ()=>{
    dispatch(EmployeeGroupAction())
  },
  windowState: ()=>{
    dispatch(WindowStatesAction())
  },
  roleList: ()=>{
    dispatch(RoleListAction())
  },
  checkKey: ()=>{
    dispatch(checkKey())
  },
  changeSlaids: (slaids)=>{
    dispatch(itemSlaid(slaids))
  },
  changeCount: (count)=>{
    dispatch(changeCount(count))
  }
})
export const LayoutCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(DefaultLayout))
