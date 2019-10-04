import React, { Component } from 'react';
import { Field, reduxForm  } from 'redux-form'
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback,
  Button
} from 'reactstrap';
import ChangeBranch from './ChangeBranch'
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
    console.log(touched,error);
    return(
      <FormGroup>
        <Label htmlFor="prependedInput">{label.name}</Label>
        <div className="controls">
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className={label.icon}></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input invalid={touched && error!==undefined} {...input} type={type} autoComplete={label.name} />
            {touched && error && <FormFeedback>{error}</FormFeedback>}
          </InputGroup>
        </div>
      </FormGroup>
    )
  }
}
class UserAdd extends Component {
  constructor(props){
    super(props)
    this.state = {
      branches: false,
      access: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeBranch = this.changeBranch.bind(this)
  }
  handleSubmit(values){
    if(!this.state.access){
      alert('Не выбран роль');
    }else if (this.state.branches===false) {
      alert('Не выбрано ни одного отделения');
    }else{
      values.branches = this.state.branches;
      values.role = this.state.access;
      this.props.useradd(values,this.props.history)
    }
  }
  changeBranch(branch,access){
    if(branch && parseInt(access,10)>0){
      this.setState({
        access: access,
        branches: branch.join()
      });
    }else{
      this.setState({
        access: "0",
        branches: ""
      });
    }
  }
  componentDidUpdate(){
    if(this.props.success_useradd.status){
      this.props.reset();
      this.setState({
        access: false,
        branches: []
      });
      this.props.default();
      alert('Пользователь удачно добавлен');
    }
  }
  render(){
    const { handleSubmit} = this.props;
    return(
      <div>
        <Card className="mx-12">
          <CardBody className="p-4">
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <h1>Добавить пользователя системы</h1>
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
              <ChangeBranch branches={this.props.branch_list_tree} changeBranch={this.changeBranch}/>
              <br />
              <Button type="submit" color="success" block>Создать пользователя</Button>
            </form>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default reduxForm({
  form: 'user_add',
  validate,
  warn
})(UserAdd);
