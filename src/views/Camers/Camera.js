import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,FormFeedback, Row,Input,Button, Table } from 'reactstrap';
var jsmpeg = require('jsmpeg');

class Camera extends Component {
  constructor(props){
    super(props)

  }
  stop(){
    this.props.cameraStop()
  }
  stream(){
    var canvas = document.getElementById('videoCanvas');
    var client = new WebSocket('ws://127.0.0.1:5000/');
    var player = new jsmpeg(client, {canvas:canvas});
    player.startRecording(function(player){
      console.log('player');
    });
  }
  componentWillMount(){
    this.props.cameraInfo(this.props.match.params.id);
  }
  render(){
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Камера:</strong>
              </CardHeader>
              <CardBody>
                {
                  this.props.camera_success.status ?
                    <div>
                      <span>Отделение: </span><h4> {this.props.camera_success.data[0].F_NAME}</h4>
                      <span>IP: </span><h4> {this.props.camera_success.data[0].ip}</h4>
                      <Button onClick={()=>this.stream()}>Видео</Button>
                      <Button onClick={()=>this.stop()}>Стоп</Button>
                      <div style={{marginTop: "15px"}}>
                        <canvas style={{border: "2px solid gray"}} width="800" height="500" id="videoCanvas"></canvas>
                      </div>

                    </div>
                  :
                    false
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Camera;
