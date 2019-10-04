import {DEFAULT,SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR,SERVER} from '../constants/';
import axios from 'axios';
export const stateDefault = ()=> ({
  type: DEFAULT+'LOGIN',
})
export const serverDispatch = ()=> ({
  type: SERVER_DISPATCH+'LOGIN',
})
export const dispatchSuccess = (data)=> ({
  type: DISPATCH_SUCCESS+'LOGIN',
  data: data,
})
export const dispatchError = (msg)=> ({
  type: DISPATCH_ERROR+'LOGIN',
  msg: msg
})
export const LoginAction = (values,history)=>{
  return (dispatch,getState)=>{
    dispatch(serverDispatch())
      var querystring = require('querystring');
      axios({
        method: 'post',
        url: SERVER+'auth/v1/login',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
          login: values.login,
          password: values.password
        })
      })
      .then(function (response) {
        if (response.data.type === 'error') {
          dispatch(dispatchError(response.data.msg));
        }else if(response.data.type === 'ok'){
          dispatch(dispatchSuccess(response.data.data));
          sessionStorage.setItem('nomad_auth',response.data.token);
          history.push('/analytics');
        }else{
          dispatch(dispatchError('server no response'));
        }
      })
      .catch(function (error) {
        dispatch(dispatchError('server error response'));
      });
  }
}
