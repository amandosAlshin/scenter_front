import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row,Button, Table } from 'reactstrap';
import Loader from '../Loader';
class Camers extends Component {
  constructor(props){
    super(props);
    this.deleteCamera = this.deleteCamera.bind(this);
  }
  componentWillMount(){
    this.props.camersAllList()
  }
  deleteCamera(camera_id){
    this.props.deleteCamera(camera_id);
  }
  componentDidUpdate(){
   if(this.props.camera_delete_success.status){
     alert(this.props.camera_delete_success.msg);
     this.props.defaultDelete()
   }
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Loader loader={this.props.loading_camers_list || this.props.loading_camera_delete} />
        <Row>
            <Col xl={12}>
                <Button color="primary" href="/camera/camera-add">Добавить</Button>
            </Col>
        </Row>
        <br />
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Камеры <small className="text-muted">{this.props.camers_success.data.length}</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Отделение</th>
                      <th scope="col">IP</th>
                      <th scope="col">Пользователь</th>
                      <th scope="col">Пароль</th>
                      <th scope="col">rtsp port</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.camers_success.data.map((camera, index) =>
                      <tr key={index}>
                          <th scope="row">{camera.F_NAME}</th>
                          <td>{camera.ip}</td>
                          <td>{camera.user}</td>
                          <td>{camera.password}</td>
                          <td>{camera.rtsp_port}</td>
                          <td><Badge onClick={()=>this.props.history.push(`/camera/camera-watch/${camera.id}`)} color='danger'>Открыть</Badge>&nbsp;&nbsp;<Badge onClick={()=>this.deleteCamera(camera.id)} color='primary'>Удалить</Badge></td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Camers;
