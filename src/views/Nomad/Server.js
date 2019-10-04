import React, { Component } from 'react';
import {  Card, CardBody, CardHeader } from 'reactstrap';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import {  groupBy } from './groupBy';
var _ = require('lodash');
class Servers extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }
  componentWillMount(){
    this.props.branchList();
  }
  componentWillReceiveProps(props){
    if(props.branch_success.data.length>0){
      var servers = _.filter(props.branch_success.data, function(o) {return o.F_IP_ADDRESS.indexOf('.')>0});
      var sr = groupBy(servers, 'F_IP_ADDRESS', 'F_IP_ADDRESS', 'servers');
      sr.map(function(item){
        let status = _.filter(item.servers, function(o){return parseInt(o.ONN,10)>0});
        if(status.length>0){
          item.status = 1;
        }else{
          item.status = 0;
        }
        return true;
      })
      this.setState({data: sr});
    }
  }
  render() {
    const columnss = [
      {
        title: 'Сервер',
        dataIndex: 'F_IP_ADDRESS',
        key: 'F_IP_ADDRESS',
        render: (text,row)=>{
          return(
            <span>{text} / ({_.map(row.servers, 'label').join(', ')})</span>
          )
        }
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        render: (text) =>{
          if(parseInt(text,10)>0){
              return (
                <span>
                  <span style={{
                    color: '#57d500',
                    transition: 'all .3s ease'
                  }}>
                    &#x25cf;
                  </span> {
                    'Доступен'
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
      }
      // {
      //   title: 'Количество доступных/Всего',
      //   dataIndex: 'servers',
      //   key: 'servers',
      //   render: (text,row) => {
      //     if(row.length>0){
      //       var count = _.filter(row.children, function(o) {return parseInt(o.ONN,10) >0});
      //       return count.length + '/' + row.children.length;
      //     }else{
      //       if(parseInt(text,10)>0){
      //         return (
      //           <span>
      //             <span style={{
      //               color: '#57d500',
      //               transition: 'all .3s ease'
      //             }}>
      //               &#x25cf;
      //             </span> {
      //               'Доступен'
      //             }
      //           </span>
      //
      //         );
      //       }else{
      //         return (
      //           <span>
      //             <span style={{
      //               color: '#ff2e00',
      //               transition: 'all .3s ease'
      //             }}>
      //               &#x25cf;
      //             </span> {
      //               'Недоступно'
      //             }
      //           </span>
      //         );
      //       }
      //     }
      //   }
      // }
     ];
    return(
      <div>
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
      </div>
    )
  }
}

export default Servers;
