import {CameraAllListAction} from '../../actions/camers_all_list'
import Camers from '../../views/Camers/Camers'
import {cameraDeleteAction,stateDefault as defaultDelete} from '../../actions/camera_delete'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
const mapStateToProps = (state) => {
  return {
    //users list
    loading_camers_list: state.camers_all_list.loading,
    errorserver_camers_list: state.camers_all_list.errorserver,
    camers_success: state.camers_all_list.success,

    loading_camera_delete: state.camera_delete.loading,
    errorserver_camera_delete: state.camera_delete.errorserver,
    camera_delete_success: state.camera_delete.success,
  }
}

const mapDispatchToProps = (dispatch) => ({
  camersAllList: ()=>{
      dispatch(CameraAllListAction());
  },
  deleteCamera: (camera_id)=>{
    dispatch(cameraDeleteAction(camera_id))
  },
  defaultDelete: ()=>{
    dispatch(defaultDelete())
  }
})
export const CamersCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(Camers))
