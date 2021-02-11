import {SERVER} from '../constants/';
import axios from 'axios';
export const CameraStopAction = ()=>{
  return ()=>{
      var querystring = require('querystring');
      const AuthStr = 'Bearer '.concat(sessionStorage.nomad_auth);
      axios({
        method: 'post',
        url: SERVER+'api/camera/camera_stop',
        headers: {
          'crossDomain': true,
          'Authorization': AuthStr,
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
  }
}
