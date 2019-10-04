var _ = require('lodash');
export const groupBy = (dataToGroupOn, fieldNameToGroupOn, fieldNameForGroupName, fieldNameForChildren)=>{
    var result = _.chain(dataToGroupOn)
        .groupBy(fieldNameToGroupOn)
        .toPairs()
        .map(function (currentItem) {
            return _.zipObject([fieldNameForGroupName, fieldNameForChildren], currentItem);
        })
        .value();
    return result;
}
function flatten(arr){
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}
function groupCachier(data){
  let cashier = [],
      manager = [];
   for(var g=0; g<=data.length-1; g++){
     if(_.lowerCase(data[g].worktitle)==='кассир'){
       cashier.push(data[g].windows)
     }else{
       manager.push(data[g].windows)
     }
   }
   if(cashier.length>0){
     cashier = flatten(cashier);
   }
   if(manager.length>0){
     manager = flatten(manager);
   }
   return [{worktitle: 'Кассир', windows: cashier},{worktitle: 'Менеджер',windows: manager}]
}
function checkCashier(cashier,idqueue){
   return _.filter(cashier, function(o) {return parseInt(o.F_QUEUE_ID,10)===parseInt(idqueue,10)});
}
function inserviceTicket(inservice_branch,winno){
  return _.filter(inservice_branch, function(o) {return parseInt(o.windownum,10)===parseInt(winno,10)});
}
function ticketsGroupRole(role,tickets){
  var cashier=[],
      manager=[];
  for(var t=0;t<=tickets.length-1;t++){
    var check_cashier =checkCashier(role.cashier,tickets[t].idqueue);
    if(check_cashier.length>0){
      cashier.push(tickets[t])
    }else{
      manager.push(tickets[t])
    }
  }
  return [{worktitle: 'Кассир',tickets: cashier},{worktitle: 'Менеджер', tickets: manager}]
}
export const monitoringData = (branch,newtickets,inservice,window_group,role,waits_group,serv_group)=>{
  let newtickets_branch = _.filter(newtickets, function(o) {return parseInt(o.idbranch,10)===parseInt(branch,10)});
  newtickets_branch.length>0 ?  newtickets_branch = newtickets_branch[0].tickets : newtickets_branch =[];
  let inservice_branch = _.filter(inservice, function(o) {return parseInt(o.idbranch,10)===parseInt(branch,10)});
  inservice_branch.length>0 ?  inservice_branch = inservice_branch[0].tickets : inservice_branch=[];
  let window_branch = _.filter(window_group, function(o) {return parseInt(o.idbranch,10)===parseInt(branch,10)});
  if(window_branch.length>0){
    let window_role_group  =  [];
    for(var w=0;w<=window_branch[0].windows.length-1;w++){
      var inservice_ticket = inserviceTicket(inservice_branch,window_branch[0].windows[w].winno)
      if(inservice_ticket.length>0){
        window_branch[0].windows[w].ticket = inservice_ticket;
      }else{
        window_branch[0].windows[w].ticket = [];
      }
    }
    if(window_branch.length>0){
      window_role_group  =  groupBy(window_branch[0].windows, 'worktitle', 'worktitle', 'windows');
    }
    window_role_group = groupCachier(window_role_group);
    var role_tickets = ticketsGroupRole(role,newtickets_branch);
    waits_group = _.filter(waits_group, function(o) {return parseInt(o.idss,10)===parseInt(branch,10)});
    serv_group = _.filter(serv_group, function(o) {return parseInt(o.idss,10)===parseInt(branch,10)});
    return {
      newtickets: role_tickets,
      waits_ticket: newtickets_branch,
      serv_ticket: inservice_branch,
      windows: window_role_group,
      serv_group: serv_group,
      waits_group: waits_group
    }
  }else{
    return false
  }
}
