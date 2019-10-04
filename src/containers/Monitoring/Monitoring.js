import Monitoring from '../../views/Monitoring'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import { branchUserFilter } from '../../selectors/branch_user_filter_list'
import { waitsTicket } from '../../selectors/waits_ticket'
import { servTicket } from '../../selectors/serv_tickets'
import { windowGroup } from '../../selectors/window_state_list'
import { roleGroup } from '../../selectors/role_group'
import { waitsBranchGroup } from '../../selectors/waits_group_branch'
import { servBranchGroup } from '../../selectors/serv_group_branch'
import {TicketListAction} from '../../actions/ticket_list'
import { WindowStatesAction } from '../../actions/window_state'
const mapStateToProps = (state) => {
  return {
    filter: state.filter.filter,
    filter_filial: state.filter.filial,
    filter_branch: state.filter.branch,
    branches: branchUserFilter(state),
    waits_ticket: waitsTicket(state),
    serv_ticket: servTicket(state),
    window_group: windowGroup(state),
    waits_group_branch: waitsBranchGroup(state),
    serv_group_branch: servBranchGroup(state),
    role_group: roleGroup(state),
    tickets: state.ticket_list.success.data,
    windows: state.window_state.success.data
  }
}

const mapDispatchToProps = (dispatch) => ({
  windowState: (update)=>{
    dispatch(WindowStatesAction(update))
  },
  ticketList: (history,update)=>{
      dispatch(TicketListAction(history,update));
  },
})
export const MonitoringCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(Monitoring))
