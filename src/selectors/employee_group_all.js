import { createSelector } from 'reselect'
import { groupBy } from './groupBy'
const employeeStatus = (state) => state.employee_list.success.status;
const employee = (state) => state.employee_list.success.data;
export const employeeGroupAll = createSelector(
  [ employeeStatus,employee],
  (employeeStatus,employee) => {
    if(employeeStatus){
      var arr = groupBy(employee, 'F_DESCR', 'F_DESCR', 'employee');
      return arr;
    }else{
      return false;
    }
  }
)
