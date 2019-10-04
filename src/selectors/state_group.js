import { createSelector } from 'reselect'
import { groupBy } from './groupBy'
var _ = require('lodash');
const ticketsStatus = (state) => state.ticket_list.success.status;
const tickets = (state) => state.ticket_list.success.data;
const filter = (state) => state.filter.filter;
const filter_filial = (state) => state.filter.filial;
const filter_branch = (state) => state.filter.branch;
export const stateGroup = createSelector(
  [ ticketsStatus, tickets,filter,filter_filial,filter_branch],
  (status,data,filter,filter_filial,filter_branch) => {
    var tickets = data;
    if(filter && filter_branch){
      tickets = _.filter(data, function(o) {
          return parseInt(o.idbranch,10) === parseInt(filter_branch,10);
      });
    }
    if(filter && filter_filial){
      var tickets_branch=[];
      for(var i=0;i<=filter_filial.length-1;i++){
        for(var s=0;s<=tickets.length-1;s++){
          if(parseInt(filter_filial[i].F_ID,10) === parseInt(tickets[s].idbranch,10)){
            tickets_branch.push(tickets[s])
          }
        }
      }
      tickets = tickets_branch;
    }
    if(status){
      var result = groupBy(tickets, 'state', 'state', 'tickets');
      result = _.orderBy(result, ['state'], ['asc']);
      var completed = _.filter(result, function(a){return a.state === "COMPLETED"}),
          delayed = _.filter(result, function(a){return a.state === "DELAYED"}),
          inservice = _.filter(result, function(a){return a.state === "INSERVICE"}),
          missed = _.filter(result, function(a){return a.state === "MISSED"}),
          new_state = _.filter(result, function(a){return a.state === "NEW"}),
          zombie = _.filter(result, function(a){return a.state === "ZOMBIE"});
      var states = [];
      if(completed.length>0){
        states.push({
            "state": "COMPLETED",
            "count": completed[0].tickets.length,
            "namess": "Обслуженные",
            "tickets": completed[0].tickets
        })
      }
      if(delayed.length>0){
        states.push({
            "state": "DELAYED",
            "count": delayed[0].tickets.length,
            "namess": "Отложенные",
            "tickets": delayed[0].tickets
        })
      }
      if(inservice.length>0){
        states.push({
            "state": "INSERVICE",
            "count": inservice[0].tickets.length,
            "namess": "Обслуживающиеся",
            "tickets": inservice[0].tickets
        })
      }
      if(missed.length>0){
        states.push({
            "state": "MISSED",
            "count": missed[0].tickets.length,
            "namess": "Не подошедшие",
            "tickets": missed[0].tickets
        })
      }
      if(new_state.length>0){
        states.push({
            "state": "NEW",
            "count": new_state[0].tickets.length,
            "namess": "Ожидающие",
            "tickets": new_state[0].tickets
        })
      }
      if(zombie.length>0){
        states.push({
            "state": "ZOMBIE",
            "count": zombie[0].tickets.length,
            "namess": "Неопределенный",
            "tickets": zombie[0].tickets
        })
      }
      return states;
    }else{
      return false;
    }
  }
)
