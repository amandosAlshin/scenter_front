import BranchDetail from '../../views/Detail/BranchDetail'
import ChildBranch from '../../views/Detail/BranchDetail/ChildBranch'
import BranchChildDetailTable from '../../views/Detail/BranchDetail/BranchChildDetailTable'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import { stateGroup } from '../../selectors/state_group'
import { queueGroup } from '../../selectors/queue_group'
import { overWaitsGroup } from '../../selectors/overWaits_group'
import { waitsGroup } from '../../selectors/waits_group'
import { servGroup } from '../../selectors/serv_group'
import { branchGroup } from '../../selectors/branch_group';
const mapStateToProps = (state) => {
  return {
    state_group: stateGroup(state),
    branchs: state.branch_list.success.data,
    queues: state.queue_list.success.data,
    queue_group: queueGroup(state),
    overWaits_group: overWaitsGroup(state),
    waits_group: waitsGroup(state),
    serv_group: servGroup(state),
    branch_group: branchGroup(state)
  }
}

const mapDispatchToProps = (dispatch) => ({

})
export const BranchDetailCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(BranchDetail))
export const BranchChildCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(ChildBranch))
export const BranchDetailChildTableCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(BranchChildDetailTable))
