import { createSelector } from 'reselect'
import { groupBy } from './groupBy'
import { timeDifference } from './timeDifference'
import { timeConvert } from './timeConvert'
var _ = require('lodash');
const ticketsStatus = (state) => state.ticket_list.success.status;
const tickets = (state) => state.ticket_list.success.data;
const branchsStatus = (state) => state.branch_list.success.status;
const branchs = (state) => state.branch_list.success.data;
const filter = (state) => state.filter.filter;
const filter_filial = (state) => state.filter.filial;
const filter_branch = (state) => state.filter.branch;
function branchFilter(data,idbranch){
  return _.filter(data, function(o) {return parseInt(o.F_ID,10) === idbranch});
}
function flatten(arr){
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
export const servBranchGroup = createSelector(
  [ ticketsStatus, tickets,branchsStatus,branchs,filter,filter_filial,filter_branch ],
  (ticketsStatus,data,branchsStatus,branchs,filter,filter_filial,filter_branch) => {
    if(branchsStatus && ticketsStatus){
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
          if(o.state === "COMPLETED") {
              o.avgServ = timeDifference(o.startservtime, o.stopservtime)
              return o;
          }
      });
      var ticket_branch = groupBy(result, 'idbranch', 'idbranch', 'tickets');
      var arr = [];
      for(var i=0; i<=ticket_branch.length-1; i++){
        var temp = branchFilter(branchs,parseInt(ticket_branch[i].idbranch,10));
        if(temp.length > 0){
            arr.push({
                "idss": temp[0].F_ID,
                "w_name": temp[0].F_NAME,
                "count": ticket_branch[i].tickets.length,
                "serv": _.sumBy(ticket_branch[i].tickets, 'avgServ'),
                "tickets": ticket_branch[i].tickets
            });
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
                'count': _.sumBy(objs, 'count'),
                'serv': Math.round(_.sumBy(objs, 'serv')/_.sumBy(objs, 'count') * 100)/100,
                'servConvert': timeConvert(Math.round(_.sumBy(objs, 'serv')/_.sumBy(objs, 'count') * 100)/100),
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
