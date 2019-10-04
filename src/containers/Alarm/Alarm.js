import Alarm from '../../views/Alarm'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import { alarmGroup } from '../../selectors/alarm_list';
import {TicketListAction} from '../../actions/ticket_list'
const mapStateToProps = (state) => {
  return {
    alarm_list: alarmGroup(state),
    tickets: state.ticket_list.success.data,
  }
}

const mapDispatchToProps = (dispatch) => ({
  ticketList: (history,update)=>{
      dispatch(TicketListAction(history,update));
  }
})
export const AlarmCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(Alarm))
