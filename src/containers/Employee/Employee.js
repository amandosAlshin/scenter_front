import Employee from '../../views/Employee'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import { employeeGroup } from '../../selectors/employee_group';
import { employeeGroupAll } from '../../selectors/employee_group_all';
import { branchUserFilter } from '../../selectors/branch_user_filter_list'
import { employeeGroupAdd,stateDefault } from '../../actions/group_employee_add'

const mapStateToProps = (state) => {
  return {
    employee_group: employeeGroup(state),
    employee_list: employeeGroupAll(state),
    employee_group_list: state.employee_group_list.success,
    filter: state.filter.filter,
    filter_filial: state.filter.filial,
    filter_branch: state.filter.branch,
    branches: branchUserFilter(state),

    loading_empl_gr_add: state.employee_group_add.loading,
    errorserver_empl_gr_add: state.employee_group_add.errorserver,
    empl_gr_add_success: state.employee_group_add.success,
  }
}

const mapDispatchToProps = (dispatch) => ({
  employeeGroupAdd: (values)=>{
      dispatch(employeeGroupAdd(values));
  },
  groupAddDefault: ()=>{
    dispatch(stateDefault())
  }
})
export const EmployeeCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(Employee))
