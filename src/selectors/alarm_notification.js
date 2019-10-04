import { createSelector } from 'reselect'
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
function parentbranch(data,parentid){
  return _.filter(data, function(a){return parseInt(a.F_ID,10) === parentid});
}
export const alarmNotification = createSelector(
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
      var ticket_new = _.filter(tickets, function(o) { return o.state ==="NEW" && o.waitover ==="true"});
      var arr = [];
      for(var i=0; i<=ticket_new.length-1; i++){
          var temp = branchFilter(branchs,parseInt(ticket_new[i].idbranch,10));
          if(temp.length > 0){
              var parent = parentbranch(branchs,parseInt(temp[0].F_PARENT_ID,10));
              arr.push({
                  "ticketno": ticket_new[i].ticketno,
                  "idbranch": ticket_new[i].idbranch,
                  "id_parent_branch": parent[0].F_ID,
                  "branch_name": temp[0].F_NAME,
                  "branch_parent_name": parent[0].F_NAME,
                  "idqueue": ticket_new[i].idqueue,
                  "servicename": ticket_new[i].servicename,
                  "waitover": ticket_new[i].waitover,
              });
         }
      }
      return arr;
    }else{
      return false;
    }
  }
)
