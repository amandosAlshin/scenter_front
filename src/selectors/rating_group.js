import { createSelector } from 'reselect'
import { groupBy } from './groupBy'
var _ = require('lodash');
const ticketsStatus = (state) => state.ticket_list.success.status;
const tickets = (state) => state.ticket_list.success.data;
const filter = (state) => state.filter.filter;
const filter_filial = (state) => state.filter.filial;
const filter_branch = (state) => state.filter.branch;
export const ratingGroup = createSelector(
  [ ticketsStatus, tickets,filter,filter_filial,filter_branch ],
  (status,data,filter,filter_filial,filter_branch) => {
    if(status){
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
      var completed = _.filter(tickets, function(o) {
          if(o.state === "COMPLETED") {
              return o;
          }
      });
      var result = groupBy(completed, 'rating', 'rating', 'tickets');
      for(var i=0; i<=result.length-1; i++){
          if(result[i].rating === "5"){
              result[i].rates = "Отлично";
              result[i].count = result[i].tickets.length;
          }else if(result[i].rating === "4"){
              result[i].rates = "Хорошо";
              result[i].count = result[i].tickets.length;
          }else if(result[i].rating === "3"){
              result[i].rates = "Средний";
              result[i].count = result[i].tickets.length;
          }else if(result[i].rating === "2"){
              result[i].rates = "Плохо";
              result[i].count = result[i].tickets.length;
          }else if(result[i].rating === "1"){
              result[i].rates = "Очень плохо";
              result[i].count = result[i].tickets.length;
          }else{
              result[i].rates = "Нет оценки";
              result[i].count = result[i].tickets.length;
          }
      }
      return result;

  }else {
    return false;
  }
}
)
