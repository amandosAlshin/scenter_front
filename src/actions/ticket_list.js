import {UPDATE_SERVER,SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR,SERVER} from '../constants/';
import axios from 'axios';
export const updateDispatch = (data)=> ({
  type: UPDATE_SERVER+' TICKET_LIST',
  data: data
})
export const serverDispatch = ()=> ({
  type: SERVER_DISPATCH+' TICKET_LIST',
})
export const dispatchSuccess = (data)=> ({
  type: DISPATCH_SUCCESS+'TICKET_LIST',
  data: data,
})
export const dispatchError = (msg)=> ({
  type: DISPATCH_ERROR+'TICKET_LIST',
  msg: msg
})
export const TicketListAction = (history,update=false)=>{
  return (dispatch,getState)=>{
      if(update){
        dispatch(updateDispatch(update.data))
      }else{
        dispatch(serverDispatch())
      }

      const AuthStr = 'Bearer '.concat(sessionStorage.nomad_auth);
      axios({
        method: 'post',
        url: SERVER+'api/tickets/tickets_list',
        headers: {
          'crossDomain': true,
          'Authorization': AuthStr,
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        if (response.data.type === 'error') {
          dispatch(dispatchError(response.data.msg));
          if(response.data.msg ==='Empty tickets'){
            history.push('/notticket')
          }
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
