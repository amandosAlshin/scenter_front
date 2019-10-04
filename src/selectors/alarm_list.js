import { createSelector } from 'reselect'
import { timeDifference } from './timeDifference'
import { timeConvert } from './timeConvert'

var _ = require('lodash');
var moment = require('moment');
const ticketsStatus = (state) => state.ticket_list.success.status;
const tickets = (state) => state.ticket_list.success.data;
const queuesStatus = (state) => state.queue_list.success.status;
const queues = (state) => state.queue_list.success.data;
const branchsStatus = (state) => state.branch_list.success.status;
const branchs = (state) => state.branch_list.success.data;
const filter = (state) => state.filter.filter;
const filter_filial = (state) => state.filter.filial;
const filter_branch = (state) => state.filter.branch;
function branchFilter(data,idbranch){
  return _.filter(data, function(o) {return parseInt(o.F_ID,10) === idbranch});
}
function parentbranch(data,parentid){
  return _.filter(data, function(a){return parseInt(a.F_ID,10) === parentid});
}
function waitoverCheck(time,queues,queueid){
  let queue = _.filter(queues, function(o) {
      return parseInt(o.F_ID,10) === parseInt(queueid,10);
  });
  if(queue.length>0){
    if(time>queue[0].F_QWAIT_TIME){
      return true;
    }else{
      return false
    }
  }else{
    return false;
  }

}
export const alarmGroup = createSelector(
  [ ticketsStatus, tickets,branchsStatus,branchs,queuesStatus,queues,filter,filter_filial,filter_branch],
  (ticketsStatus,data,branchsStatus,branchs,queuesStatus,queues,filter,filter_filial,filter_branch) => {
    if(branchsStatus && ticketsStatus && queuesStatus){
      var tickets = data;
      if(filter && filter_branch){
        tickets = _.filter(data, function(o) {
            return parseInt(o.idbranch,10) === parseInt(filter_branch,10);
        });
      }
      if(filter && filter_filial){
        var tickets_branch=[];
        for(var f=0;f<=filter_filial.length-1;f++){
          for(var s=0;s<=tickets.length-1;s++){
            if(parseInt(filter_filial[f].F_ID,10) === parseInt(tickets[s].idbranch,10)){
              tickets_branch.push(tickets[s])
            }
          }
        }
        tickets = tickets_branch;
      }
      var ticket_new = _.filter(tickets, function(o) { return o.state ==="NEW" || o.state==="INSERVICE" });
      var arr = [];

      for(var i=0; i<=ticket_new.length-1; i++){
          var waiting;
          if(ticket_new[i].state === 'NEW'){
            waiting = timeDifference(ticket_new[i].starttime, moment().unix(),true);
          }else{
            waiting = timeDifference(ticket_new[i].starttime, ticket_new[i].startservtime);
          }
          let waitover = waitoverCheck(waiting,queues,ticket_new[i].idqueue);
          var temp = branchFilter(branchs,parseInt(ticket_new[i].idbranch,10));
          if(temp.length > 0){
              var parent = parentbranch(branchs,parseInt(temp[0].F_PARENT_ID,10));

              arr.push({
                  "ticketno": parseInt(ticket_new[i].ticketno,10),
                  "starttime": new Date((parseInt(ticket_new[i].starttime,10)/1000)*1000).getHours() + ":" + new Date((parseInt(ticket_new[i].starttime,10)/1000)*1000).getMinutes(),
                  "startservtime": ticket_new[i].startservtime,
                  "stopservtime": ticket_new[i].stopservtime,
                  "state": ticket_new[i].state,
                  "idbranch": ticket_new[i].idbranch,
                  "id_parent_branch": parent[0].F_ID,
                  "branch_name": temp[0].F_NAME,
                  "branch_parent_name": parent[0].F_NAME,
                  "idoperator": ticket_new[i].idoperator,
                  "idqueue": ticket_new[i].idqueue,
                  "operator": ticket_new[i].operator,
                  "servicename": ticket_new[i].servicename,
                  "waitover": waitover,
                  "waiting": waiting,
                  "waitingConvert": timeConvert(waiting)
              });
         }
      }
      return arr;
    }else{
      return false;
    }
  }
)
