import { createSelector } from 'reselect'
import { groupBy } from './groupBy'
var _ = require('lodash');
const employeeStatus = (state) => state.employee_list.success.status;
const employee = (state) => state.employee_list.success.data;
const windowsStatus = (state) => state.window_state.success.status;
const windows = (state) => state.window_state.success.data;
function operatorInfo(employee,idoperator){
  return _.filter(employee, function(o) { return o.F_ID === idoperator });
}
export const windowGroup = createSelector(
  [ employeeStatus, employee,windowsStatus,windows],
  (employeeStatus,employee,windowsStatus,windows) => {
    if(employeeStatus && windowsStatus){
      for(var w=0; w<=windows.length-1; w++){
        if(windows[w].idoperator>0){
            var operator = operatorInfo(employee,windows[w].idoperator);
            windows[w].operator = operator;
        }else{
          windows[w].operator = [];
        }
      }

      var windows_state = groupBy(windows, 'idbranch', 'idbranch', 'windows');
      return windows_state;
    }else{
      return false;
    }
  }
)
