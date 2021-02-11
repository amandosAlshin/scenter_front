import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {cameraAdd,stateDefault} from '../../actions/camera_add'
import CameraAdd from '../../views/Camers/CameraAdd'
import { branchListTree } from '../../selectors/branch_list_tree';
const mapStateToProps = (state,ownProps) => {
    return {
      loading_cameraadd: state.camera_add.loading,
      errorserver_cameraadd: state.camera_add.errorserver,
      success_cameraadd: state.camera_add.success,

      branch_list_tree: branchListTree(state)
    }
}
const mapDispatchToProps = (dispatch) => ({
  cameraadd: (values,history)=>{
    dispatch(cameraAdd(values,history))
  },
  default: ()=>{
    dispatch(stateDefault())
  }
})
export const CameraaddCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(CameraAdd))
