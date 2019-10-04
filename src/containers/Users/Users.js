import {UserListAction} from '../../actions/users_list'
import Users from '../../views/Users'
import {userDeleteAction,stateDefault as defaultDelete} from '../../actions/user_delete'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
const mapStateToProps = (state) => {
  return {
    //users list
    loading_users_list: state.user_list.loading,
    errorserver_users_list: state.user_list.errorserver,
    users_success: state.user_list.success,

    loading_user_delete: state.user_delete.loading,
    errorserver_user_delete: state.user_delete.errorserver,
    user_delete_success: state.user_delete.success,
  }
}

const mapDispatchToProps = (dispatch) => ({
  usersList: ()=>{
      dispatch(UserListAction());
  },
  deleteUser: (user_id)=>{
    dispatch(userDeleteAction(user_id))
  },
  defaultDelete: ()=>{
    dispatch(defaultDelete())
  }
})
export const UsersCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(Users))
