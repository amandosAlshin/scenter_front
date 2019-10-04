import Main from '../../views/Main'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import { stateGroup } from '../../selectors/state_group'
import { queueGroup } from '../../selectors/queue_group'
import { overWaitsGroup } from '../../selectors/overWaits_group'
import { waitsGroup } from '../../selectors/waits_group'
import { servGroup } from '../../selectors/serv_group'
import { branchUserFilter } from '../../selectors/branch_user_filter_list'
const mapStateToProps = (state) => {
  return {
    state_group: stateGroup(state),
    queue_group: queueGroup(state),
    overWaits_group: overWaitsGroup(state),
    waits_group: waitsGroup(state),
    serv_group: servGroup(state),

    filter: state.filter.filter,
    filter_filial: state.filter.filial,
    filter_branch: state.filter.branch,

    branch_user_filter: branchUserFilter(state)
  }
}

const mapDispatchToProps = (dispatch) => ({

})
export const MainCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(Main))
