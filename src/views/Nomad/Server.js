import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Button,Row,Col } from 'reactstrap';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
var _ = require('lodash');
class Servers extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
    this.filter = this.filter.bind(this)
    this.reset = this.reset.bind(this)
  }
  componentWillMount(){
    this.props.branchList();
  }
  componentWillReceiveProps(props){
    this.setState({data: this.props.branch_tree});

  }
  filter(){
    var data = this.state.data;
    let filterChild=(data)=>{
      let on = _.filter(data, function(o) {return parseInt(o.ONN,10) ===0});
      return on;
    }
    for(var o=0;o<=data.length-1;o++){
      data[o].children = filterChild(data[o].children)
    }
    this.setState({data: data})
  }
  reset(){
    window.location.reload();
  }
  render() {
    const columnss = [
      {
        title: 'Сервер',
        dataIndex: 'F_NAME',
        key: 'F_NAME'
      },
      {
        title: 'Статус',
        dataIndex: 'ONN',
        key: 'ONN',
        render: (text,row) => {
          if(row.children.length>0){
            return false;
          }else if (parseInt(row.ONN,10)>0) {
            return (
              <span>
                <span style={{
                  color: '#4dbd74 ',
                  transition: 'all .3s ease'
                }}>
                  &#x25cf;
                </span> {
                  'Доступно'
                }
              </span>
            );
          }else{
              return (
                <span>
                  <span style={{
                    color: '#ff2e00',
                    transition: 'all .3s ease'
                  }}>
                    &#x25cf;
                  </span> {
                    'Недоступно'
                  }
                </span>
              );
          }
        }
      },
      {
        title: 'Количество доступных/Всего',
        dataIndex: 'F_ID',
        key: 'F_ID',
        render: (text,row) => {
          if(row.children.length>0){
            var count = _.filter(row.children, function(o) {return parseInt(o.ONN,10) >0});
            return count.length + '/' + row.children.length;
          }
        }
      }
     ];
    return(
      <div>
        <Row>
            <Col md={1}>
                <Button color="primary" onClick={this.filter}>Недоступные</Button>
            </Col>
            <Col md={1}>
                <Button color="primary" onClick={this.reset}>Все</Button>
            </Col>
        </Row>
        <br />
        <Row>
            <Col xl={12}>
              {
                this.state.data.length > 0 ?
                <Card>
                  <CardHeader>
                    Серверы Nomad
                  </CardHeader>
                  <CardBody>
                    <Table
                        rowKey="key"
                        className="components-table-demo-nested"
                        columns={columnss}
                        dataSource={this.state.data}
                        pagination={{ pageSize: 20 }}
                    />
                </CardBody>
              </Card>
              :
                <h4>Нету отделений</h4>
            }
            </Col>
        </Row>
      </div>
    )
  }
}

export default Servers;
