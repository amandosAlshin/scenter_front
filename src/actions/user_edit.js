import {DEFAULT,SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR,SERVER} from '../constants/';
import axios from 'axios';
export const stateDefault = ()=> ({
  type: DEFAULT+'USER_EDIT',
})
export const serverDispatch = ()=> ({
  type: SERVER_DISPATCH+'USER_EDIT',

})
export const dispatchSuccess = (msg)=> ({
  type: DISPATCH_SUCCESS+'USER_EDIT',
  msg: msg

})
export const dispatchError = (msg)=> ({
  type: DISPATCH_ERROR+'USER_EDIT',
  msg: msg
})
export const userEdit = (values,history)=>{
  return (dispatch,getState)=>{
    dispatch(serverDispatch())
      var querystring = require('querystring');
      const AuthStr = 'Bearer '.concat(sessionStorage.nomad_auth);
      axios({
        method: 'post',
        url: SERVER+'api/user/useredit',
        headers: {
          'crossDomain': true,
          'Authorization': AuthStr,
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
          login: values.login,
          password: values.password,
          email: values.email,
          user_id: values.user_id,
          send_n: values.send_n
        })
      })
      .then(function (response) {
        if (response.data.type === 'error') {
          dispatch(dispatchError(response.data.msg));
        }else if(response.data.type === 'ok'){
          dispatch(dispatchSuccess(response.data.msg));
        }else{
          dispatch(dispatchError('server no response'));
        }
      })
      .catch(function (error) {
        dispatch(dispatchError('server error response'));
      });
  }
}
