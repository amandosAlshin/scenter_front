import Peakclock from '../../views/Peakclock'
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
export const PeakclockCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(Peakclock))
