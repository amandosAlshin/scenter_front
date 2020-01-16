import QueueDetail from '../../views/Detail/QueueDetail'
import QueueChildDetailTable from '../../views/Detail/QueueDetail/QueueChildDetailTable'
import Child from '../../views/Detail/QueueDetail/Child'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import { stateGroup } from '../../selectors/state_group'
import { queueGroup } from '../../selectors/queue_group'
import { overWaitsGroup } from '../../selectors/overWaits_group'
import { waitsGroup } from '../../selectors/waits_group'
import { servGroup } from '../../selectors/serv_group'
import { ratingGroup } from '../../selectors/rating_group'
import { employeeGroup } from '../../selectors/employee_group';
const mapStateToProps = (state) => {
  return {
    state_group: stateGroup(state),
    branchs: state.branch_list.success.data,
    queues: state.queue_list.success.data,
    queue_group: queueGroup(state),
    overWaits_group: overWaitsGroup(state),
    waits_group: waitsGroup(state),
    employee_group: employeeGroup(state),
    rating_group: ratingGroup(state),
    serv_group: servGroup(state)
  }
}

const mapDispatchToProps = (dispatch) => ({

})
export const QueueDetailCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(QueueDetail))
export const QueueChildCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(Child))
export const QueueDetailChildTableCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(QueueChildDetailTable))
