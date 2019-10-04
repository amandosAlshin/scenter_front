var _ = require('lodash');
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
export const stateGroup=(data,idbranch)=>{
    var result = groupBy(data, 'state', 'state', 'tickets');
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
}
