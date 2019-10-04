import {SERVER} from '../constants/';
import axios from 'axios';
export const checkKey = ()=>{
  return (dispatch,getState)=>{
      axios({
        method: 'post',
        url: SERVER+'auth/v1/usercheck',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        ///console.log(response);
      })
      .catch(function (error) {
      //  console.log(error);
      });
  }
}
