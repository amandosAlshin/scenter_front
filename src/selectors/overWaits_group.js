import { createSelector } from 'reselect'
import { timeDifference } from './timeDifference'
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
function queueFilter(data,idqueue){
  return _.filter(data, function(o) {return o.F_ID === idqueue});
}
function parentQueue(data,parentid){
  return _.filter(data, function(a) {return a.F_ID === parentid})
}
function flatten(arr){
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
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
export const overWaitsGroup = createSelector(
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
      var result = [];
      for(var w=0; w<=tickets.length-1; w++){
        var waiting;
        if(tickets[w].state === 'NEW'){
          waiting = timeDifference(tickets[w].starttime, moment().unix(),true);
        }else{
          waiting = timeDifference(tickets[w].starttime, tickets[w].startservtime);
        }
        let waitover = waitoverCheck(waiting,queues,tickets[w].idqueue);
        if(waitover){
          result.push(tickets[w]);
        }
      }
      var ticket_queue = groupBy(result, 'idqueue', 'idqueue', 'tickets');
      var arr = [];
      for(var i=0; i<=ticket_queue.length-1; i++){
        var temp = queueFilter(queues,parseInt(ticket_queue[i].idqueue,10));
        if(temp.length > 0){
            var parent = parentQueue(queues,parseInt(temp[0].F_ID_PARENT,10));
            if(parseInt(parent[0].F_ID_PARENT,10) !== 0){
              arr.push({
                  "idss": parent[0].F_ID,
                  "w_name": parent[0].F_NAME,
                  "f_work_name": parent[0].F_WORK_NAME,
                  "count": ticket_queue[i].tickets.length,
                  "tickets": ticket_queue[i].tickets
              });
            }else{
              arr.push({
                  "idss": temp[0].F_ID,
                  "w_name": temp[0].F_NAME,
                  "f_work_name": temp[0].F_WORK_NAME,
                  "count": ticket_queue[i].tickets.length,
                  "tickets": ticket_queue[i].tickets
              });
            }
        }
      }
      var output =
          _(arr)
            .groupBy('idss')
            .map(function(objs, key, index){
                var ti_arr =(data)=>{
                  var t=[];
                  for(var i=0; i<=data.length-1;i++){
                    t.push(data[i].tickets);
                  }
                  return flatten(t);
                }
                return {
                'idss': key,
                'w_name': objs[0].w_name,
                'f_work_name': objs[0].f_work_name,
                'count': _.sumBy(objs, 'count'),
                "tickets": ti_arr(objs)
              }
            })
            .value();
      return output;
    }else{
      return false;
    }
  }
)
