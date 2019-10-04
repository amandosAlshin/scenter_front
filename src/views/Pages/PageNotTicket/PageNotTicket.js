import React, { Component } from 'react';
import { Button, Col, Container,  Row } from 'reactstrap';

class PageNotTicket extends Component {
  constructor(props){
    super(props)
    this.changeUser = this.changeUser.bind(this)
  }
  changeUser(){
    sessionStorage.removeItem('nomad_auth');
    window.location.href = '/login'
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4"><i className="icon-social-reddit icons font-4xl d-block mt-4"></i></h1>
                <h4 className="pt-3">Билеты не получены.</h4>
                <p className="text-muted float-left">В ваших отделениях еще не созданы билеты.</p>

              </div>
                <Button onClick = {this.changeUser} color="primary">Сменить пользователя</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PageNotTicket;
