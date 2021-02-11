import { createSelector } from 'reselect'
import { groupBy } from './groupBy'
import { timeDifference } from './timeDifference'
var _ = require('lodash');
const ticketsStatus = (state) => state.ticket_list.success.status;
const tickets = (state) => state.ticket_list.success.data;
const filter = (state) => state.filter.filter;
const filter_filial = (state) => state.filter.filial;
const filter_branch = (state) => state.filter.branch;
export const timeGroup = createSelector(
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
          for(var t=0;t<=tickets.length-1;t++){
            if(parseInt(filter_filial[f].F_ID,10) === parseInt(tickets[t].idbranch,10)){
              tickets_branch.push(tickets[t])
            }
          }
        }
        tickets = tickets_branch;
      }
      var ticket_branch = _.filter(tickets, function(o) {
        if(o.state ==="NEW" || o.state==="COMPLETED" || o.state==="INSERVICE"){
            if(o.state === "COMPLETED"){
              o.inservice = timeDifference(o.startservtime, o.stopservtime)
              o.waiting = timeDifference(o.starttime, o.startservtime)
            }else if (o.state === "INSERVICE") {
              o.inservice = false;
              o.waiting = timeDifference(o.starttime, o.startservtime)
            }else{
              o.inservice = false;
              o.waiting = false;
            }
            return o;
        }
      });
      for(var i=0; i<=ticket_branch.length-1; i++){
        if(ticket_branch[i].starttime>1000){
          ticket_branch[i].starttime_hours = new Date((parseInt(ticket_branch[i].starttime,10)/1000)*1000).getHours();
          ticket_branch[i].starttime_minutes = new Date((parseInt(ticket_branch[i].starttime,10)/1000)*1000).getMinutes();
          ( 0 <=ticket_branch[i].starttime_minutes  && ticket_branch[i].starttime_minutes < 20)
          ?
            ticket_branch[i].time_event = parseInt(ticket_branch[i].starttime_hours+"00",10)
          :
            (20 <= ticket_branch[i].starttime_minutes && ticket_branch[i].starttime_minutes < 40)
          ?
            ticket_branch[i].time_event = parseInt(ticket_branch[i].starttime_hours+"20",10)
          :
            ticket_branch[i].time_event = parseInt(ticket_branch[i].starttime_hours+"40",10)
        }else{
          ticket_branch[i].starttime_hours = false;
          ticket_branch[i].starttime_minutes = false;
        }
      }
      var  result = _.orderBy(ticket_branch, ['time_event'], ['asc']);
      ;
      result = groupBy(ticket_branch, 'time_event', 'time_event', 'tickets');

      var arr = [];
      for(var s=0; s<=result.length-1; s++){
        let waitover=0,preservover=0,ratingover = 0;
        _.map(result[s].tickets,function(p){
          if(p.waitover === "true"){
            waitover++;
          }
          if(p.PreServOver === "true"){
            preservover++;
          }
          if(p.ratingover <=2){
            ratingover++;
          }
        });
        var hour = result[s].time_event.slice(0,result[s].time_event.length-2);
        var minute = result[s].time_event.slice(result[s].time_event.length-2,result[s].time_event.length);
        var employee = groupBy(result[s].tickets, 'operator', 'operator', 'tickets');
        arr.push({
            "time_event": result[s].time_event,
            "count": result[s].tickets.length,
            "tickets": result[s].tickets,
            "waitover": waitover,
            "preservover": preservover,
            "ratingover": ratingover,
            "problemticket": waitover+preservover+ratingover,
            "kpi": Math.round(100-(((waitover+preservover+ratingover)*100)/result[s].tickets.length)),
            "time": hour+":"+minute,
            'employee_count': employee.length,
            "Среднее время обслуживания": Math.round(_.sumBy(result[s].tickets, 'inservice')/result[s].tickets.length * 100)/100,
            "Среднее время ожидания": Math.round(_.sumBy(result[s].tickets, 'waiting')/result[s].tickets.length * 100)/100
        });
      }
      return arr;
    }else{
      return false;
    }
  }
)
