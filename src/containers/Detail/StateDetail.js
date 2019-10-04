import StateDetail from '../../views/Detail/StateDetail'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import { timeGroup } from '../../selectors/time_group'
const mapStateToProps = (state) => {
  return {
    time_group: timeGroup(state)
  }
}

const mapDispatchToProps = (dispatch) => ({

})
export const StateDetailCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(StateDetail))
