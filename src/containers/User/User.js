import User from '../../views/Users/User'
import {UserInfoAction} from '../../actions/user_info'
import {userEdit,stateDefault} from '../../actions/user_edit'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
const mapStateToProps = (state) => {
  return {
    //users list
    loading_user_info: state.user_info.loading,
    errorserver_user_info: state.user_info.errorserver,
    user_success: state.user_info.success,

    //users list
    loading_useredit_info: state.user_edit.loading,
    errorserver_useredit_info: state.user_edit.errorserver,
    useredit_success: state.user_edit.success,

    branch_success: state.branch_list.success
  }
}

const mapDispatchToProps = (dispatch) => ({
  usersInfo: (user_id)=>{
      dispatch(UserInfoAction(user_id));
  },
  default: ()=>{
    dispatch(stateDefault())
  },
  usersEdit: (values)=>{
      dispatch(userEdit(values));
  }
})
export const UserCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(User))
