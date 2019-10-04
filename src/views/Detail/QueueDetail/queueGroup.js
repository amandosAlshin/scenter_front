var _ = require('lodash');
var moment = require('moment');
export const flatten=(arr)=>{
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
function queueFilter(data,idqueue){
  return _.filter(data, function(o) {return o.F_ID === idqueue});
}
function parentQueue(data,parentid){
  return _.filter(data, function(a) {return a.F_ID === parentid})
}
function groupBy(dataToGroupOn, fieldNameToGroupOn, fieldNameForGroupName, fieldNameForChildren){
    var result = _.chain(dataToGroupOn)
        .groupBy(fieldNameToGroupOn)
        .toPairs()
        .map(function (currentItem) {
            return _.zipObject([fieldNameForGroupName, fieldNameForChildren], currentItem);
        })
        .value();
    return result;
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
function timeDifference(date1,date2,moment=false){
    date1 = parseInt(date1,10)/1000;
    var a = new Date(date1*1000);
    var b = false;
    if(moment){
      b = new Date(date2*1000);
    }else{
      date2 = parseInt(date2,10)/1000
      b = new Date(date2*1000);
    }
    var difference = Math.abs(a - b)/1000;
    return Math.round(Math.floor((difference/60)%60));
}
export const queueChildGroup=(data,queues,idbranch)=>{
  var tickets_branch = [];
  if(parseInt(idbranch,10)>0){
    tickets_branch =  _.filter(data, function(a){return parseInt(a.idbranch,10) === parseInt(idbranch,10)});
  }else{
    tickets_branch=data;
  }
  var ticket_queue = groupBy(tickets_branch, 'idqueue', 'idqueue', 'tickets');
  var arr = [];
  for(var i=0; i<=ticket_queue.length-1; i++){
    var temp = queueFilter(queues,parseInt(ticket_queue[i].idqueue,10));
    if(temp.length > 0){
        var new_tickets = _.filter(ticket_queue[i].tickets, function(o) {return o.state === 'NEW'});
        var inservice_tickets = _.filter(ticket_queue[i].tickets, function(o) {return o.state === 'INSERVICE'});
        var waitover = _.filter(new_tickets, function(a){
            let waiting = timeDifference(a.starttime, moment().unix(),true);
            let waitover = waitoverCheck(waiting,queues,a.idqueue);
            if(waitover){
              return a;
            }
        });
        arr.push({
            "idss": temp[0].F_ID,
            "w_name": temp[0].F_NAME,
            "f_parent_id": temp[0].F_ID_PARENT,
            "f_work_name": temp[0].F_WORK_NAME,
            "waits": _.sumBy(ticket_queue[i].tickets, 'avgWaits'),
            "serv": _.sumBy(ticket_queue[i].tickets, 'avgServ'),
            "count": ticket_queue[i].tickets.length,
            "tickets": ticket_queue[i].tickets,
            "wait_tickets": new_tickets.length,
            "inservice_tickets": inservice_tickets.length,
            "waitover_tickets": waitover.length,
        });
    }
  }
  console.log(arr);
  var output =
      _(arr)
        .groupBy('idss')
        .map(function(objs, key, index){
          return {
            'key': key,
            'idss': key,
            'w_name': objs[0].w_name,
            'f_work_name': objs[0].f_work_name,
            "f_parent_id": objs[0].f_parent_id,
            "tickets": objs[0].tickets,
            'waits': Math.round(_.sumBy(objs, 'waits')/_.sumBy(objs, 'count') * 100)/100,
            'serv': Math.round(_.sumBy(objs, 'serv')/_.sumBy(objs, 'count') * 100)/100,
            'waitsConvert': Math.round(_.sumBy(objs, 'avgWaits')/_.sumBy(objs, 'count') * 100)/100,
            'count': _.sumBy(objs, 'count'),
            "wait_tickets":_.sumBy(objs, 'wait_tickets'),
            "inservice_tickets": _.sumBy(objs, 'inservice_tickets'),
            "waitover_tickets": _.sumBy(objs, 'waitover_tickets'),
          }
        })
        .value();
  console.log(output);
  return output;
}
export const queueGroup = (data,queues,idbranch)=> {
  var tickets_branch = [];
  if(parseInt(idbranch,10)>0){
    tickets_branch =  _.filter(data, function(a){return parseInt(a.idbranch,10) === parseInt(idbranch,10)});
  }else{
    tickets_branch = data;
  }
  var ticket_queue = groupBy(tickets_branch, 'idqueue', 'idqueue', 'tickets');

  var arr = [];
  for(var i=0; i<=ticket_queue.length-1; i++){
    var temp = queueFilter(queues,parseInt(ticket_queue[i].idqueue,10));
    if(temp.length > 0){
        var parent = parentQueue(queues,parseInt(temp[0].F_ID_PARENT,10));
        var new_tickets = _.filter(ticket_queue[i].tickets, function(o) {return o.state === 'NEW'});
        var inservice_tickets = _.filter(ticket_queue[i].tickets, function(o) {return o.state === 'INSERVICE'});
        var waitover = _.filter(new_tickets, function(a){
            let waiting = timeDifference(a.starttime, moment().unix(),true);
            let waitover = waitoverCheck(waiting,queues,a.idqueue);
            if(waitover){
              return a;
            }
        });
        arr.push({
            "idss": parent[0].F_ID,
            "w_name": parent[0].F_NAME,
            "f_work_name": parent[0].F_WORK_NAME,
            "count": ticket_queue[i].tickets.length,
            "Ожидающие": new_tickets.length,
            "Обслуживающиеся": inservice_tickets.length,
            "Ожидающие больше норматива": waitover.length,
        });
    }
  }
  var output =
      _(arr)
        .groupBy('idss')
        .map(function(objs, key, index){
            return {
            'idss': key,
            'w_name': objs[0].w_name,
            'f_work_name': objs[0].f_work_name,
            'count': _.sumBy(objs, 'count'),
            "Ожидающие": _.sumBy(objs, 'Ожидающие'),
            "Обслуживающиеся": _.sumBy(objs, 'Обслуживающиеся'),
            "Ожидающие больше норматива": _.sumBy(objs, 'Ожидающие больше норматива')
          }
        })
        .value();
        return output;
}
