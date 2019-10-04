import React, { Component } from 'react';
import {  Col, Container,     Row } from 'reactstrap';

class MonitoringWorking extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4"><i className="icon-social-reddit icons font-4xl d-block mt-4"></i></h1>
                <h4 className="pt-3">СТРАНИЦА В РАЗРАБОТКЕ</h4>
                <p className="text-muted float-left">Приносим свои извинения.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default MonitoringWorking;
