import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader,Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
  Table,
  CardHeader
} from 'reactstrap';
import Loader from '../Loader';
import { Field, reduxForm  } from 'redux-form'
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
  return(
    <FormGroup>
      <Row>
        <Col xs={4}>
          <Label htmlFor={input.name}>{label.name} </Label>
        </Col>
        <Col xs={8}>
          <Input style={{width: '100%'}} id={input.name} invalid={touched && error!==undefined} {...input} type={type} autoComplete={label.name} />
          {touched && error && <FormFeedback>{error}</FormFeedback>}
        </Col>
      </Row>
    </FormGroup>
  )
}
var _ = require('lodash');
class GroupEmployee extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.listPosts = this.listPosts.bind(this)
    this.changeGroup = this.changeGroup.bind(this)
    this.state = {
      posts: [],
      groups: []
    }
  }
  handleSubmit(values){
    this.props.employeeGroupAdd(values)
  }
  listPosts(employeeGroup,group){
    var arr = [];
    var group_u = _.filter(group, function(o){return parseInt(o.parent_id,10) === 0}),
        group_d = _.filter(group, function(g){return parseInt(g.parent_id,10) > 0});
    employeeGroup.map(function(item,index){
      var check = _.filter(group_d, function(d){return d.name === item.F_DESCR});
      if(check.length>0){
          arr.push({key: index,name: item.F_DESCR,group: check[0].parent_id})
      }else{
        arr.push({key: index,name: item.F_DESCR,group: false})
      }
      return arr;
    })
    this.setState({posts: arr,groups: group_u})
  }
  componentDidMount(){
    if(this.props.employee_group.length>0){
      this.listPosts(this.props.employee_group,this.props.group_list.data);
    }
  }
  componentWillReceiveProps(props){
    if(props.employee_group.length>0){
      this.listPosts(props.employee_group,props.group_list.data);
    }
  }
  componentDidUpdate(){
    if(this.props.success_add.status){
      this.props.reset();
      this.props.default_add();
      alert('Группа удачно добавлен');
    }
    if(this.props.error_add.status){
      alert(this.props.error_add.msg);
    }
  }
  changeGroup(d,g){
    console.log(this.state.posts,d);
    var arr = this.state.posts;
    arr.map(function(item){
      if(item.key === d){
        item.group = g
      }
      return item;
    })
    this.setState({posts: arr});
  }
  render() {
    const { handleSubmit} = this.props;
    return (
      <Modal isOpen={this.props.open} toggle={this.props.toggle}
                       className={'modal-lg '}>
        <ModalHeader toggle={this.props.toggle}>Группировка должностей</ModalHeader>
        <ModalBody>
          <Loader loader={this.props.loading_add} />
          <Card className="mx-12">
            <CardHeader>
              Добавить группу
            </CardHeader>
            <CardBody className="p-4">
              <form onSubmit={handleSubmit(this.handleSubmit)}>
                <Row>
                  <Col xs={8}>
                    <Field
                      name="name"
                      type="text"
                      component={renderField}
                      label={{name: "Название "}}
                    />
                  </Col>
                  <Col xs={4}>
                    <Button type="submit" color="success" block>Добавить</Button>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
          <div>
            {
              this.state.posts.length>0 ?
                <Table responsive>
                    <thead>
                      <tr>
                        <th>Должности</th>
                        {
                          this.state.groups.map(function(item,index){
                            return (<th key={index} style={{textAlign: 'center'}}>{item.name}</th>)
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.posts.map(function(item,index){
                          return(
                            <tr key={index}>
                              <td>{item.name}</td>
                              {
                                this.state.groups.map(function(group){
                                  return(
                                    <td key={group.id} style={{textAlign: 'center'}}>
                                      <Input
                                        checked={item.group === group.id}
                                        onChange={()=>this.changeGroup(item.key,group.id)}
                                        className="form-check-input"
                                        type="radio"
                                        id={"group"+item.id}
                                        name={"group"+item.id}
                                      />
                                    </td>
                                  )
                                },this)
                              }
                            </tr>
                          )
                        },this)
                      }
                    </tbody>
                </Table>
              :
                false
            }

          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggle}>Сохранить</Button>{' '}
          <Button color="secondary" onClick={this.props.toggle}>Отмена</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default reduxForm({
  form: 'group_add',
  validate,
  warn
})(GroupEmployee);
