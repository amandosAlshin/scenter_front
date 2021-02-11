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
var _ = require('lodash');
const validate = values => {
const errors = {}

  return errors
}
const warn = values => {
  const warnings = {}

  return warnings
}
const renderField = ({ input, label, type,icon, meta: { touched, error } }) => {
  if(label.icon){
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
    }else{
        return(
            <FormGroup>
              <Label htmlFor="prependedInput">{label.name}</Label>
              <div className="controls">
                <InputGroup className="mb-4">
                  <Input invalid={touched && error!==undefined} {...input} type={type} autoComplete={label.name} />
                  {touched && error && <FormFeedback>{error}</FormFeedback>}
                </InputGroup>
              </div>
            </FormGroup>
        )

    }
}
class CameraAdd extends Component {
  constructor(props){
    super(props)
    this.state = {
      branches: false,
      access: false,
      filialChange: false,
      branchList: [],
      branch: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeBranch = this.changeBranch.bind(this)
    this.filialChange = this.filialChange.bind(this)
  }
  filialChange(e){
    var filial = _.filter(this.props.branch_list_tree, function(o) {return parseInt(o.F_ID,10)===parseInt(e.target.value,10)});
    this.setState({
      branchList: filial[0].children
    })
  }
  handleSubmit(values){
    if (this.state.branch===false) {
      alert('Не выбрано ни одного отделения');
    }else{
      values.branchid = this.state.branch
      this.props.cameraadd(values,this.props.history);
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
        branches: ""
      });
    }
  }
  componentDidUpdate(){
    if(this.props.success_cameraadd.status){
      this.props.reset();
      this.setState({
        access: false,
        branches: []
      });
      this.props.default();
      alert('Камера удачно добавлен');
    }
  }
  render(){
    const { handleSubmit} = this.props;
    return(
      <div>
        <Card className="mx-12">
          <CardBody className="p-4">
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <h1>Добавить камеру</h1>
              <Field
                name="ip"
                type="text"
                component={renderField}
                label={{icon: "icon-user",name: "IP адресс"}}
              />
              <Field
                name="user"
                type="text"
                component={renderField}
                label={{icon: "icon-envelope",name: "Пользователь"}}
              />
              <Field
                name="password"
                type="password"
                component={renderField}
                label={{icon: "icon-lock",name: "Пароль"}}
              />
              <Field
                name="port"
                type="text"
                component={renderField}
                label={{icon: "icon-lock",name: "RTSP port"}}
              />
              {
                this.props.branch_list_tree ?
                  <div>
                    <FormGroup>
                      <Label htmlFor="ccfilial">Филиал</Label>
                      <Input onChange={this.filialChange} type="select" name="ccfilial" id="ccfilial">
                        <option value={0}>Выберите филиал</option>
                        {
                          this.props.branch_list_tree.map(function(item,index){
                            return(<option key={index} value={item.F_ID}>{item.F_NAME}</option>)
                          })
                        }
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="ccbranch">Отделение</Label>
                      <Input onChange={(e)=>{e.target.value === 0 ? this.setState({branch: false}) : this.setState({branch: e.target.value})}} disabled={this.state.branchList.length===0} type="select" name="ccbranch" id="ccbranch">
                        <option value={0}>Выберите отделение</option>
                        {
                          this.state.branchList.map(function(item,index){
                            return(<option key={index} value={item.F_ID}>{item.F_NAME}</option>)
                          })
                        }
                      </Input>
                    </FormGroup>
                  </div>
                :
                  false
              }
              <br />
              <Button type="submit" color="success" block>Добавить</Button>
              <Button href="/camera/camera-list" color="primary" block>Назад</Button>
            </form>
          </CardBody>
        </Card>
      </div>
    )
  }
}
export default reduxForm({
  form: 'camera_add',
  validate,
  warn
})(CameraAdd);
