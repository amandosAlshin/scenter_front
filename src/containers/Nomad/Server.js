import Servers from '../../views/Nomad/Server'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {BranchListAction} from '../../actions/branch_list'
const mapStateToProps = (state) => {
  return {
    //branch list
    loading_branch_list: state.branch_list.loading,
    errorserver_branch_list: state.branch_list.errorserver,
    branch_success: state.branch_list.success,
  }
}

const mapDispatchToProps = (dispatch) => ({
  branchList: (data)=>{
    dispatch(BranchListAction(data));
  },
})
export const ServersCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(Servers))
