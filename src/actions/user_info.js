import {SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR,SERVER} from '../constants/';
import axios from 'axios';
export const serverDispatch = ()=> ({
  type: SERVER_DISPATCH+' USER_INFO',
})
export const dispatchSuccess = (data)=> ({
  type: DISPATCH_SUCCESS+'USER_INFO',
  data: data,
})
export const dispatchError = (msg)=> ({
  type: DISPATCH_ERROR+'USER_INFO',
  msg: msg
})
export const UserInfoAction = (user_id)=>{
  return (dispatch,getState)=>{
    dispatch(serverDispatch())
      var querystring = require('querystring');
      const AuthStr = 'Bearer '.concat(sessionStorage.nomad_auth);
      axios({
        method: 'post',
        url: SERVER+'api/user/userinfo',
        headers: {
          'crossDomain': true,
          'Authorization': AuthStr,
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
          user_id: user_id
        })
      })
      .then(function (response) {
        if (response.data.type === 'error') {
          dispatch(dispatchError(response.data.msg));
        }else if(response.data.type === 'ok'){
          dispatch(dispatchSuccess(response.data.data));
        }else{
          dispatch(dispatchError('server no response'));
        }
      })
      .catch(function (error) {
        dispatch(dispatchError('server error response'));
      });
  }
}
