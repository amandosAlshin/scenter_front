import { createSelector } from 'reselect'
import { groupBy } from './groupBy'
import { timeDifference } from './timeDifference'
import { timeConvert } from './timeConvert'
var _ = require('lodash');
var moment = require('moment');
const ticketsStatus = (state) => state.ticket_list.success.status;
const tickets = (state) => state.ticket_list.success.data;
const queuesStatus = (state) => state.queue_list.success.status;
const queues = (state) => state.queue_list.success.data;
const filter = (state) => state.filter.filter;
const filter_filial = (state) => state.filter.filial;
const filter_branch = (state) => state.filter.branch;
function servoverCheck(time,queues,queueid){
  let queue = _.filter(queues, function(o) {
      return parseInt(o.F_ID,10) === parseInt(queueid,10);
  });
  if(queue.length>0){
    if(time>queue[0].F_MAX_SERV_TIME){
      return true;
    }else{
      return false
    }
  }else{
    return false;
  }
}
function preServOverCheck(time,queues,queueid){
  let queue = _.filter(queues, function(o) {
      return parseInt(o.F_ID,10) === parseInt(queueid,10);
  });
  if(queue.length>0){
    if(time>queue[0].F_MAX_SERV_TIME-2){
      return true;
    }else{
      return false
    }
  }else{
    return false;
  }
}
export const servTicket = createSelector(
  [ ticketsStatus, tickets,queuesStatus,queues,filter,filter_filial,filter_branch],
  (ticketsStatus,data,queuesStatus,queues,filter,filter_filial,filter_branch) => {
    if(queuesStatus && ticketsStatus){
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
      var result = _.filter(tickets, function(o) {
          if(o.state === "INSERVICE") {
              o.avg = timeDifference(o.startservtime, moment().unix(),true)
              return o;
          }
      });
      var arr = [];
      for(var w=0; w<=result.length-1; w++){
        var serv;
        serv = timeDifference(result[w].startservtime, moment().unix(),true);
        let servover = servoverCheck(serv,queues,result[w].idqueue);
        let preservover = preServOverCheck(serv,queues,result[w].idqueue)
        result[w].serv = serv;
        result[w].servConvert = timeConvert(serv);
        result[w].servover = servover;
        result[w].preservover = preservover;
        arr.push(result[w]);
      }
      var tickets_branchs = groupBy(arr, 'idbranch', 'idbranch', 'tickets');
      return tickets_branchs;
    }else{
      return false;
    }
  }
)
