import {DEFAULT,SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR,SERVER} from '../constants/';
import {UserListAction} from './users_list'
import axios from 'axios';
export const stateDefault = ()=> ({
  type: DEFAULT+'USER_DELETE',
})
export const serverDispatch = ()=> ({
  type: SERVER_DISPATCH+'USER_DELETE',

})
export const dispatchSuccess = (msg)=> ({
  type: DISPATCH_SUCCESS+'USER_DELETE',
  msg: msg

})
export const dispatchError = (msg)=> ({
  type: DISPATCH_ERROR+'USER_DELETE',
  msg: msg
})
export const userDeleteAction = (user_id,history)=>{
  return (dispatch,getState)=>{
    dispatch(serverDispatch())
      var querystring = require('querystring');
      const AuthStr = 'Bearer '.concat(sessionStorage.nomad_auth);
      axios({
        method: 'post',
        url: SERVER+'api/user/userdelete',
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
          dispatch(dispatchSuccess(response.data.msg));
          dispatch(UserListAction());
        }else{
          dispatch(dispatchError('server no response'));
        }
      })
      .catch(function (error) {
        dispatch(dispatchError('server error response'));
      });
  }
}
