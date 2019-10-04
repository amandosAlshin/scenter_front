import { createSelector } from 'reselect'
import { timeDifference } from './timeDifference'
var _ = require('lodash');
const ticketsStatus = (state) => state.ticket_list.success.status;
const tickets = (state) => state.ticket_list.success.data;
const branchsStatus = (state) => state.branch_list.success.status;
const branchs = (state) => state.branch_list.success.data;
const filter = (state) => state.filter.filter;
const filter_filial = (state) => state.filter.filial;
const filter_branch = (state) => state.filter.branch;

export const tenMinuteWaits = createSelector(
  [ ticketsStatus, tickets,branchsStatus,branchs,filter,filter_filial,filter_branch],
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
            if(o.state === "INSERVICE" || o.state === "COMPLETED" || (o.startservtime > 1000 && o.starttime > 1000)) {
                o.avgWaits = timeDifference(o.starttime, o.startservtime);
                return o;
            }
        });
      var normal =  _.filter(result, function(o) { return o.avgWaits<10});
      return Math.round((normal.length/result.length)*100);
    }else{
      return false;
    }
  }
)
