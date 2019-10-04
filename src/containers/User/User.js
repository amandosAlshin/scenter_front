import User from '../../views/Users/User'
import {UserInfoAction} from '../../actions/user_info'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
const mapStateToProps = (state) => {
  return {
    //users list
    loading_user_info: state.user_info.loading,
    errorserver_user_info: state.user_info.errorserver,
    user_success: state.user_info.success,

    branch_success: state.branch_list.success
  }
}

const mapDispatchToProps = (dispatch) => ({
  usersInfo: (user_id)=>{
      dispatch(UserInfoAction(user_id));
  }
})
export const UserCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(User))
