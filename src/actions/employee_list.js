import {SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR,SERVER} from '../constants/';
import axios from 'axios';
export const serverDispatch = ()=> ({
  type: SERVER_DISPATCH+'EMPLOYEE_LIST',
})
export const dispatchSuccess = (data)=> ({
  type: DISPATCH_SUCCESS+'EMPLOYEE_LIST',
  data: data,
})
export const dispatchError = (msg)=> ({
  type: DISPATCH_ERROR+'EMPLOYEE_LIST',
  msg: msg
})
export const EmployeeListAction = (data)=>{
  return (dispatch,getState)=>{
    dispatch(serverDispatch())
        const AuthStr = 'Bearer '.concat(sessionStorage.nomad_auth);
      axios({
        method: 'post',
        url: SERVER+'api/employee/employee_list',
        headers: {
          'crossDomain': true,
          'Authorization': AuthStr,
          'Content-type': 'application/x-www-form-urlencoded'
        }
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
