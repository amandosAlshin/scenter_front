import Infobranch from '../../views/Infobranch'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import { branchGroup } from '../../selectors/branch_group';
const mapStateToProps = (state) => {
  return {
    branch_group: branchGroup(state)
  }
}

const mapDispatchToProps = (dispatch) => ({

})
export const InfobranchCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(Infobranch))
