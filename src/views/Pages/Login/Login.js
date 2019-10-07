import React, { Component } from 'react';
import { Button,Alert, Card, CardBody,FormFeedback, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Loader from '../../Loader';
import { Field, reduxForm } from 'redux-form'
const validate = values => {
const errors = {}
  if (!values.login) {
    errors.login = 'Логин не заполнен'
  }
  if (!values.password) {
    errors.password = 'Пароль не заполнен'
  }
  return errors
}

const warn = values => {
  const warnings = {}
  if (!values.login) {
    warnings.login = 'Логин не заполнен'
  }
  if (!values.password) {
    warnings.password = 'Пароль не заполнен'
  }
  return warnings
}
const renderField = ({ input, label, type,icon, meta: { touched, error } }) => {
  if(label.icon){
    return(
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className={label.icon}></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input invalid={touched && error!==undefined} {...input} type={type} placeholder={label.name} autoComplete={label.name} />
          {touched && error && <FormFeedback>{error}</FormFeedback>}
        </InputGroup>
    )
  }
}
class Login extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    if(sessionStorage.nomad_auth){
      this.props.history.push('/analytics')
    }
  }
  handleSubmit(values){
    this.props.default();
    this.props.login(values,this.props.history);
  }
  render() {
    const { handleSubmit} = this.props;

    return (
      <div>
        <Loader loader={this.props.loading_login} />
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <form onSubmit={handleSubmit(this.handleSubmit)}>
                        <h1>Вход</h1>
                        <p className="text-muted">Войдите в свой аккаунт</p>
                        <Field
                          name="login"
                          type="text"
                          component={renderField}
                          label={{icon: "icon-user",name: "Логин"}}
                        />
                        <Field
                          name="password"
                          type="password"
                          component={renderField}
                          label={{icon: "icon-lock",name: "Пароль"}}
                        />
                        <Row>
                          <Col xs="12">
                            {
                              this.props.errorserver_login.status ?
                                <Alert color="danger">{this.props.errorserver_login.msg}</Alert>
                              :
                                false
                            }
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="6">
                           <Button type="submit" color="primary" className="px-8">
                              Вход
                           </Button>
                          </Col>
                        </Row>
                      </form>
                    </CardBody>
                  </Card>
                  <Card  className="text-white py-5 d-md-down-none" style={{ width: 44 + '%', backgroundColor: "#B50938"}}>
                    <CardBody className="text-center">
                      <div>
                        <img style={{width: "185px"}} src={'/assets/img/logo.svg'} alt="logo"/>
                        <p style={{marginTop: '15px'}}>Ситуационный центр (СЦ) – это аналитическое решение, осуществляющее сбор, поиск и анализ информации, формирование моделей и прогнозирование развития событий, позволяющее группе людей (оперативный штаб) принимать решения и управлять ситуацией.</p>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'contact',
  validate,
  warn
})(Login);
