import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Loader from '../Loader';
class Users extends Component {
  constructor(props){
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
  }
  componentWillMount(){
    this.props.usersList()
  }
  deleteUser(user_id){
    this.props.deleteUser(user_id);
  }
  componentDidUpdate(){
   if(this.props.user_delete_success.status){
     alert(this.props.user_delete_success.msg);
     this.props.defaultDelete()
   }
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Loader loader={this.props.loading_users_list || this.props.loading_user_delete} />
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Пользователей <small className="text-muted">{this.props.users_success.data.length}</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Логин</th>
                      <th scope="col">Пароль</th>
                      <th scope="col">Роль</th>
                      <th scope="col">Дата регистраций</th>
                      <th scope="col">Опций</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.users_success.data.map((user, index) =>
                      <tr key={index}>
                          <th scope="row">{user.login}</th>
                          <td>{user.password}</td>
                          <td>{user.role === 0 ? 'Администратор' : user.role === 1 ? 'Директор' : user.role === 2 ? 'Директор филиала' : user.role === 3 ? 'Нач. отделение' : false}</td>
                          <td>{user.ins_date}</td>
                          <td><Badge onClick={()=>this.props.history.push(`/user/user-list/${user.id}`)} color='danger'>Посмотреть</Badge>&nbsp;&nbsp;<Badge onClick={()=>this.deleteUser(user.id)} color='primary'>Удалить</Badge></td>
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

export default Users;
