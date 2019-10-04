import { createSelector } from 'reselect'
import { groupBy } from './groupBy'
var _ = require('lodash');
const ticketsStatus = (state) => state.ticket_list.success.status;
const tickets = (state) => state.ticket_list.success.data;
const employeeStatus = (state) => state.employee_list.success.status;
const employee = (state) => state.employee_list.success.data;
const filter = (state) => state.filter.filter;
const filter_filial = (state) => state.filter.filial;
const filter_branch = (state) => state.filter.branch;
function employeeFilter(data,employee){
  return _.filter(data, function(o) {return parseInt(o.idoperator,10) === employee});
}
function flatten(arr){
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
export const employeeGroup = createSelector(
  [ ticketsStatus, tickets,employeeStatus,employee,filter,filter_filial,filter_branch],
  (ticketsStatus,data,employeeStatus,employee,filter,filter_filial,filter_branch) => {
    if(employeeStatus && ticketsStatus){
      var tickets = data;
      if(filter && filter_branch){
        tickets = _.filter(data, function(o) {
            return parseInt(o.idbranch,10) === parseInt(filter_branch,10);
        });
      }
      if(filter && filter_filial){
        var tickets_branch=[];
        for(var f=0;f<=filter_filial.length-1;f++){
          for(var t=0;t<=tickets.length-1;t++){
            if(parseInt(filter_filial[f].F_ID,10) === parseInt(tickets[t].idbranch,10)){
              tickets_branch.push(tickets[t])
            }
          }
        }
        tickets = tickets_branch;
      }
      var ticket_operator = _.filter(tickets, function(o) { return o.state ==="INSERVICE" || o.state==="COMPLETED" });
      var tickets_group = groupBy(ticket_operator, 'idoperator', 'idoperator', 'tickets');
      var arr = [];
      for(var i=0; i<=employee.length-1; i++){
        var temp = employeeFilter(tickets_group,parseInt(employee[i].F_ID,10));
        if(temp.length>0){
          arr.push({
              "F_BRANCH_ID": employee[i].F_BRANCH_ID,
              "F_DESCR": employee[i].F_DESCR,
              "startTime": employee[i].startTime,
              "F_ID": employee[i].F_ID,
              "F_NAME": employee[i].F_NAME,
              "F_PATRONIMIC": employee[i].F_PATRONIMIC,
              "F_SURNAME": employee[i].F_SURNAME,
              "employee":  parseInt(employee[i].startTime,10)>0 ?
                employee[i].F_WORK_NAME +'-'+ new Date((parseInt(employee[i].startTime,10)/1000)*1000).getHours() + ":" + new Date((parseInt(employee[i].startTime,10)/1000)*1000).getMinutes()
              :
                employee[i].F_WORK_NAME +'-офлайн',
              "employee_id": employee[i].F_ID,
              "tickets": temp[0].tickets,
              "count": temp[0].tickets.length
          });
        }else{
          arr.push({
              "F_BRANCH_ID": employee[i].F_BRANCH_ID,
              "F_DESCR": employee[i].F_DESCR,
              "startTime": employee[i].startTime,
              "F_ID": employee[i].F_ID,
              "F_NAME": employee[i].F_NAME,
              "F_PATRONIMIC": employee[i].F_PATRONIMIC,
              "F_SURNAME": employee[i].F_SURNAME,
              "employee":  parseInt(employee[i].startTime,10)>0 ?
                employee[i].F_WORK_NAME +'-'+ new Date((parseInt(employee[i].startTime,10)/1000)*1000).getHours() + ":" + new Date((parseInt(employee[i].startTime,10)/1000)*1000).getMinutes()
              :
                employee[i].F_WORK_NAME +'-офлайн',
              "employee_id": employee[i].F_ID,
              "tickets": [],
              "count": 0
          });
        }
      }
      arr = groupBy(arr, 'F_DESCR', 'F_DESCR', 'employee');
      let cashier = [],
          manager = [];
      for(var g=0; g<=arr.length-1; g++){
        if(_.lowerCase(arr[g].F_DESCR)==='кассир'){
          cashier.push(arr[g].employee)
        }else{
          manager.push(arr[g].employee)
        }
      }
      cashier = flatten(cashier);
      manager = flatten(manager);
      return [{F_DESCR: "Кассир",employee: cashier},{F_DESCR: "Менеджер",employee: manager}];
    }else{
      return false;
    }
  }
)
