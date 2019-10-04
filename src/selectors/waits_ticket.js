import { createSelector } from 'reselect'
import { timeDifference } from './timeDifference'
import { timeConvert } from './timeConvert'
import { groupBy } from './groupBy'
var _ = require('lodash');
var moment = require('moment');
const ticketsStatus = (state) => state.ticket_list.success.status;
const tickets = (state) => state.ticket_list.success.data;
const queuesStatus = (state) => state.queue_list.success.status;
const queues = (state) => state.queue_list.success.data;
const filter = (state) => state.filter.filter;
const filter_filial = (state) => state.filter.filial;
const filter_branch = (state) => state.filter.branch;
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
function preWaitOverCheck(time,queues,queueid){
  let queue = _.filter(queues, function(o) {
      return parseInt(o.F_ID,10) === parseInt(queueid,10);
  });
  if(queue.length>0){
    if(time>queue[0].F_QWAIT_TIME-5){
      return true;
    }else{
      return false
    }
  }else{
    return false;
  }
}
export const waitsTicket = createSelector(
  [ ticketsStatus, tickets,queuesStatus,queues,filter,filter_filial,filter_branch ],
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
      tickets = _.filter(tickets, function(a){return a.state === "NEW" || a.state === "DELAYED"});
      var result = [];
      for(var w=0; w<=tickets.length-1; w++){
        var waiting;
        waiting = timeDifference(tickets[w].starttime, moment().unix(),true);
        let waitover = waitoverCheck(waiting,queues,tickets[w].idqueue);
        let prewaitover = preWaitOverCheck(waiting,queues,tickets[w].idqueue)
        tickets[w].waiting = waiting;
        tickets[w].waitingConvert = timeConvert(waiting);
        tickets[w].waitover = waitover;
        tickets[w].prewaitover = prewaitover;
        result.push(tickets[w]);
      }
      var tickets_branchs = groupBy(result, 'idbranch', 'idbranch', 'tickets');
      return tickets_branchs;
    }else{
      return false;
    }
  }
)
