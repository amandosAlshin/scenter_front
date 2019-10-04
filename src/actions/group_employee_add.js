import {DEFAULT,SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR,SERVER} from '../constants/';
import axios from 'axios';
export const stateDefault = ()=> ({
  type: DEFAULT+'GROUP_EMPLOYEE_ADD',
})
export const serverDispatch = ()=> ({
  type: SERVER_DISPATCH+'GROUP_EMPLOYEE_ADD',

})
export const dispatchSuccess = (msg)=> ({
  type: DISPATCH_SUCCESS+'GROUP_EMPLOYEE_ADD',
  msg: msg

})
export const dispatchError = (msg)=> ({
  type: DISPATCH_ERROR+'GROUP_EMPLOYEE_ADD',
  msg: msg
})
export const employeeGroupAdd = (values)=>{
  return (dispatch,getState)=>{
    dispatch(serverDispatch())
      var querystring = require('querystring');
      const AuthStr = 'Bearer '.concat(sessionStorage.nomad_auth);
      axios({
        method: 'post',
        url: SERVER+'api/employee/employee_group_add',
        headers: {
          'crossDomain': true,
          'Authorization': AuthStr,
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
          name: values.name,
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
