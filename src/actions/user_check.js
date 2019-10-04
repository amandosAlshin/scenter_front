import {DEFAULT,SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR,SERVER} from '../constants/';
import axios from 'axios';
export const stateDefault = ()=> ({
  type: DEFAULT+'USER',
})
export const serverDispatch = ()=> ({
  type: SERVER_DISPATCH+'USER',
})
export const dispatchSuccess = (user_app)=> ({
  type: DISPATCH_SUCCESS+'USER',
  user_app: user_app
})
export const dispatchError = (msg)=> ({
  type: DISPATCH_ERROR+'USER',
  msg: msg
})
export const userCheckAction = (token,history)=>{
  return (dispatch,getState)=>{
    dispatch(serverDispatch())
      const AuthStr = 'Bearer '.concat(token);
      axios({
        method: 'post',
        url: SERVER+'api/main/usercheck',
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
            dispatch(dispatchSuccess(response.data.user_app));
        }else{
          dispatch(dispatchError(response));
        }
      })
      .catch(function (error) {
        sessionStorage.removeItem('nomad_auth');
        history.push('/login');
        dispatch(dispatchError(error));
      });
  }
}
