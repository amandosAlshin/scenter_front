import {CameraInfoAction} from '../../actions/camera_info'
import Camera from '../../views/Camers/Camera'
import { CameraStopAction } from '../../actions/camera_stop'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
const mapStateToProps = (state) => {
  return {
    //camera info
    loading_camera_info: state.camera_info.loading,
    errorserver_camera_info: state.camera_info.errorserver,
    camera_success: state.camera_info.success,
  }
}

const mapDispatchToProps = (dispatch) => ({
  cameraInfo: (camera_id)=>{
      dispatch(CameraInfoAction(camera_id));
  },
  cameraStop: ()=>{
    dispatch(CameraStopAction())
  }
})
export const CameraCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(Camera))
