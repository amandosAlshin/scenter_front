import {DEFAULT,SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR,SERVER} from '../constants/';
import {CameraAllListAction} from './camers_all_list'
import axios from 'axios';
export const stateDefault = ()=> ({
  type: DEFAULT+'CAMERA_DELETE',
})
export const serverDispatch = ()=> ({
  type: SERVER_DISPATCH+'CAMERA_DELETE',

})
export const dispatchSuccess = (msg)=> ({
  type: DISPATCH_SUCCESS+'CAMERA_DELETE',
  msg: msg

})
export const dispatchError = (msg)=> ({
  type: DISPATCH_ERROR+'CAMERA_DELETE',
  msg: msg
})
export const cameraDeleteAction = (camera_id,history)=>{
  return (dispatch,getState)=>{
    dispatch(serverDispatch())
      var querystring = require('querystring');
      const AuthStr = 'Bearer '.concat(sessionStorage.nomad_auth);
      axios({
        method: 'post',
        url: SERVER+'api/camera/cameradelete',
        headers: {
          'crossDomain': true,
          'Authorization': AuthStr,
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
          id: camera_id
        })
      })
      .then(function (response) {
        if (response.data.type === 'error') {
          dispatch(dispatchError(response.data.msg));
        }else if(response.data.type === 'ok'){
          dispatch(dispatchSuccess(response.data.msg));
          dispatch(CameraAllListAction());
        }else{
          dispatch(dispatchError('server no response'));
        }
      })
      .catch(function (error) {
        dispatch(dispatchError('server error response'));
      });
  }
}
