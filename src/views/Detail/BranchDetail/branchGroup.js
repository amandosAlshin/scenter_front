var _ = require('lodash');
export const flatten=(arr)=>{
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
function branchFilter(data,idbranch){
 return _.filter(data, function(o) {return parseInt(o.F_ID,10) === idbranch});
}
function parentbranch(data,parentid){
   return _.filter(data, function(a){return parseInt(a.F_ID,10) === parentid});
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
export const branchChildGroup = (data,branchs)=> {
  var tickets_branch = groupBy(data, 'idbranch', 'idbranch', 'tickets');
  var arr=[];
  for(var i=0; i<=tickets_branch.length-1; i++){
      var temp = branchFilter(branchs,parseInt(tickets_branch[i].idbranch,10));
      if(temp.length > 0){
          arr.push({
              "f_id": temp[0].F_ID,
              "f_parent_id": temp[0].F_PARENT_ID,
              "f_name": temp[0].F_NAME,
              "count": tickets_branch[i].tickets.length,
              "waits": _.sumBy(tickets_branch[i].tickets, 'avgWaits'),
              "serv": _.sumBy(tickets_branch[i].tickets, 'avgServ'),
              "tickets": tickets_branch[i].tickets
          });
     }
  }
  const ans = _(arr)
    .groupBy('f_id')
    .map((data, id) => ({
      f_id: id,
      key: id,
      f_name: data[0].f_name,
      f_parent_id: data[0].f_parent_id,
      count: _.sumBy(data, 'count'),
      waits: Math.round(_.sumBy(data, 'waits')/_.sumBy(data, 'count') * 100)/100,
      serv: Math.round(_.sumBy(data, 'serv')/_.sumBy(data, 'count') * 100)/100,
      tickets: data[0].tickets
    }))
    .value()
  return ans;
}
export const branchGroup = (data,branchs)=> {
  var tickets_branch = groupBy(data, 'idbranch', 'idbranch', 'tickets');
  var arr=[];
  for(var i=0; i<=tickets_branch.length-1; i++){
      var temp = branchFilter(branchs,parseInt(tickets_branch[i].idbranch,10));
      if(temp.length > 0){
          var parent = parentbranch(branchs,parseInt(temp[0].F_PARENT_ID,10));
          arr.push({
              "f_id": parent[0].F_ID,
              'child': temp[0].F_ID,
              "f_name": parent[0].F_NAME,
              "waits": _.sumBy(tickets_branch[i].tickets, 'avgWaits'),
              "serv": _.sumBy(tickets_branch[i].tickets, 'avgServ'),
              "count": tickets_branch[i].tickets.length,
          });
     }
  }
  const ans = _(arr)
    .groupBy('f_id')
    .map((data, id) => ({
      f_id: id,
      f_name: data[0].f_name,
      child: data[0].child,
      waits: Math.round(_.sumBy(data, 'waits')/_.sumBy(data, 'count') * 100)/100,
      serv: Math.round(_.sumBy(data, 'serv')/_.sumBy(data, 'count') * 100)/100,
      count: _.sumBy(data, 'count')
    }))
    .value()
  return ans;
}
