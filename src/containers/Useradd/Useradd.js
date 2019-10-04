import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {userAdd,stateDefault} from '../../actions/user_add'
import UserAdd from '../../views/Users/UserAdd'
import { branchListTree } from '../../selectors/branch_list_tree';
const mapStateToProps = (state,ownProps) => {
    return {
      loading_useradd: state.user_add.loading,
      errorserver_useradd: state.user_add.errorserver,
      success_useradd: state.user_add.success,

      branch_list_tree: branchListTree(state)
    }
}
const mapDispatchToProps = (dispatch) => ({
  useradd: (values,history)=>{
    dispatch(userAdd(values,history))
  },
  default: ()=>{
    dispatch(stateDefault())
  }
})
export const UseraddCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(UserAdd))
