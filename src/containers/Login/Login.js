import {LoginAction,stateDefault} from '../../actions/login'
import Login from '../../views/Pages/Login'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
const mapStateToProps = (state) => {
  return {
    //login list
    loading_login: state.login.loading,
    errorserver_login: state.login.errorserver,
    login_success: state.login.success
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (values,history)=>{
      dispatch(LoginAction(values,history));
  },
  default: ()=>{
    dispatch(stateDefault())
  }
})
export const LoginCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(Login))
