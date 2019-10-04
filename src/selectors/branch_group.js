import { createSelector } from 'reselect'
import { groupBy } from './groupBy'
import { timeDifference } from './timeDifference'
var _ = require('lodash');
var moment = require('moment');
const ticketsStatus = (state) => state.ticket_list.success.status;
const tickets = (state) => state.ticket_list.success.data;
const branchsStatus = (state) => state.branch_list.success.status;
const branchs = (state) => state.branch_list.success.data;
const queuesStatus = (state) => state.queue_list.success.status;
const queues = (state) => state.queue_list.success.data;
const filter = (state) => state.filter.filter;
const filter_filial = (state) => state.filter.filial;
const filter_branch = (state) => state.filter.branch;
function branchFilter(data,idbranch){
  return _.filter(data, function(o) {return parseInt(o.F_ID,10) === idbranch});
}
function parentbranch(data,parentid){
  return _.filter(data, function(a){return parseInt(a.F_ID,10) === parentid});
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
export const branchGroup = createSelector(
  [ ticketsStatus, tickets,branchsStatus,branchs,queuesStatus,queues,filter,filter_filial,filter_branch],
  (ticketsStatus,data,branchsStatus,branchs,queuesStatus,queues,filter,filter_filial,filter_branch) => {
    if(branchsStatus && ticketsStatus){
      var tickets = data;
      if(filter && filter_branch){
        tickets = _.filter(data, function(o) {
            return parseInt(o.idbranch,10) === parseInt(filter_branch,10);
        });
      }
      if(filter && filter_filial){
        var tickets_filter_branch=[];
        for(var f=0;f<=filter_filial.length-1;f++){
          for(var s=0;s<=tickets.length-1;s++){
            if(parseInt(filter_filial[f].F_ID,10) === parseInt(tickets[s].idbranch,10)){
              tickets_filter_branch.push(tickets[s])
            }
          }
        }
        tickets = tickets_filter_branch;
      }
      var ticket_new = _.filter(tickets, function(o) { return o.state ==="NEW" || o.state==="INSERVICE" });
      var tickets_branch = groupBy(ticket_new, 'idbranch', 'idbranch', 'tickets');
      var arr = [];
      for(var i=0; i<=tickets_branch.length-1; i++){
          var temp = branchFilter(branchs,parseInt(tickets_branch[i].idbranch,10));
          if(temp.length > 0){
              var parent = parentbranch(branchs,parseInt(temp[0].F_PARENT_ID,10));
              var new_tickets = _.filter(tickets_branch[i].tickets, function(a){
                  return a.state === 'NEW';
              });
              var inservise_tickets = _.filter(tickets_branch[i].tickets, function(a){
                  return a.state === 'INSERVICE';
              });
              var waitover = _.filter(new_tickets, function(a){
                  let waiting = timeDifference(a.starttime, moment().unix(),true);
                  let waitover = waitoverCheck(waiting,queues,a.idqueue);
                  if(waitover){
                    return a;
                  }
              });
              arr.push({
                  "f_id": parent[0].F_ID,
                  "f_name": parent[0].F_NAME,
                  "count": tickets_branch[i].tickets.length,
                  "Ожидающие": new_tickets.length,
                  "Обслуживающиеся": inservise_tickets.length,
                  "Ожидающие больше норматива": waitover.length,
                  "children": temp[0]
              });
         }
      }
      const ans =
        _(arr)
          .groupBy('f_id')
          .map(function(data, id){
              var ti_arr =(data)=>{
                var t=[];
                for(var i=0; i<=data.length-1;i++){
                  t.push(
                    {
                      f_id: data[i].children.F_ID,
                      f_name:data[i].children.F_NAME,
                      "Обслуживающиеся": data[i]["Обслуживающиеся"],
                      "Ожидающие": data[i]["Ожидающие"],
                      "Ожидающие больше норматива": data[i]["Ожидающие больше норматива"],
                    }
                  );
                }
                return flatten(t);
              }
              return {
                f_id: id,
                f_name: data[0].f_name,
                count: _.sumBy(data, 'count'),
                "Ожидающие": _.sumBy(data, 'Ожидающие'),
                "Обслуживающиеся": _.sumBy(data, 'Обслуживающиеся'),
                "Ожидающие больше норматива": _.sumBy(data, 'Ожидающие больше норматива'),
                "children":  ti_arr(data)
            }
          })
          .value();
      return ans;
    }else{
      return false;
    }
  }
)
