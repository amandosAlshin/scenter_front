import { createSelector } from 'reselect'
import { groupBy } from './groupBy'
var _ = require('lodash');
const roleStatus = (state) => state.role_list.success.status;
const role = (state) => state.role_list.success.data;
function flatten(arr){
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
export const roleGroup = createSelector(
  [ roleStatus, role],
  (status,data) => {
    if(status){
      var role_group = groupBy(data, 'F_NAME', 'F_NAME', 'queues');
      let cashier = [],
          manager = [];
      for(var g=0; g<=role_group.length-1; g++){
        if(_.lowerCase(role_group[g].F_NAME)==='кассир'){
          cashier.push(role_group[g].queues)
        }else{
          manager.push(role_group[g].queues)
        }
      }
      cashier = flatten(cashier);
      manager = flatten(manager);
      var data_role = {
        cashier: cashier,
        manager: manager
      }
      return data_role;
    }else{
      return false;
    }
  }
)
