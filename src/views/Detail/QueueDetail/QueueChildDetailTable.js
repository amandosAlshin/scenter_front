import React, { Component } from 'react';
import {  Card, CardBody, CardHeader,Badge } from 'reactstrap';
import { queueChildGroup,flatten } from './queueGroup'
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
var _ = require('lodash');
class QueueChildDetailTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      filial_name: false,
      branch_name: false,
      header: false
    }
    this.branchInfo = this.branchInfo.bind(this)
  }
  branchInfo(branch){
    var branch_info = _.filter(this.props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(branch,10)});
    if(branch_info.length>0){
      var filial_info = _.filter(this.props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(branch_info[0].F_PARENT_ID,10)});
      if(filial_info.length>0){
        this.setState({filial_name: filial_info[0].F_NAME});
      }else{
          this.setState({filial_name: 'Филиал'});
      }
      this.setState({branch_name: branch_info[0].F_NAME});
    }else{
      this.setState({branch_info: 'Отделение'});
    }
    return true;

  }
  queueList(tickets,queues,branch,parent_queue){
    if(tickets.length>0 && queues.length>0){
      var br_g=queueChildGroup(tickets[0].tickets,queues,branch);
      var childQueue = _.filter(br_g, function(a){return parseInt(a.f_parent_id,10) === parseInt(parent_queue,10)});
      return childQueue;
    }else{
      return false;
    }
  }
  componentWillMount(){
      if(this.props.match.params.type){
        var type_value = false,
            data = [],
            data_filter = [];
        switch(this.props.match.params.type) {
          case 'state':
            if(this.props.queues && this.props.state_group){
              type_value = this.props.match.params.data;
              this.setState({
                header: "Количество билетов со статусом '" + decodeURI(this.props.match.params.data) +"'"
              })
              data_filter = _.filter(this.props.state_group, function(o) {return o.namess === type_value});
              data = this.queueList(
                data_filter,
                this.props.queues,
                this.props.match.params.branch,
                this.props.match.params.queue
              );
              if(data.length>0){
                this.setState({data: data});
                this.branchInfo(this.props.match.params.branch);
              }
            }
            break;
          case 'raiting':
            if(this.props.queues && this.props.rating_group){
              type_value = this.props.match.params.data;
              this.setState({
                header: "Количество билетов по оценке '" + decodeURI(this.props.match.params.data) +"'"
              })
              data_filter = _.filter(this.props.rating_group, function(o) {return o.rates === type_value});
              data = this.queueList(
                data_filter,
                this.props.queues,
                this.props.match.params.branch,
                this.props.match.params.queue
              );
              if(data.length>0){
                this.setState({data: data});
                this.branchInfo(this.props.match.params.branch);
              }
            }
            break;
          case 'employee':
            if(this.props.queues && this.props.employee_group){
              type_value = this.props.match.params.data;
              var employee_arr = false;
              for (var i = 0; i <= this.props.employee_group.length-1; i++) {
                for (var s = 0; s <= this.props.employee_group[i].employee.length-1; s++) {
                  if(parseInt(this.props.employee_group[i].employee[s].employee_id,10) === parseInt(type_value,10)){
                    employee_arr = this.props.employee_group[i].employee[s];
                    break;
                  }
                }
              }
              if(employee_arr){
                this.setState({
                  header: "Количество билетов по сотруднику '" + decodeURI(employee_arr.employee) +"'"
                })
                data = this.queueList(
                  [{tickets: employee_arr.tickets}],
                  this.props.queues,
                  this.props.match.params.branch,
                  this.props.match.params.queue
                );
                if(data.length>0){
                  this.setState({data: data});
                }
              }
            }
            break;
          case 'branch':
            if(this.props.queues && this.props.state_group){
              type_value = this.props.match.params.data;
              if(type_value === 'waitover' && this.props.overWaits_group){
                if(this.props.overWaits_group.length>0){
                  this.props.overWaits_group.map(function(item){
                      return data_filter.push(item.tickets);
                  })
                  data_filter = flatten(data_filter);
                  var tickets_new = _.filter(data_filter, function(o) {return o.state === 'NEW'});
                  this.setState({
                    header: "Количество билетов со статусом 'Ожидающие больше норматива'"
                  });
                  data = this.queueList(
                    [{tickets: tickets_new}],
                    this.props.queues,
                    this.props.match.params.branch,
                    this.props.match.params.queue
                  );
                }
              }else{
                this.setState({
                  header: "Количество билетов со статусом '" + decodeURI(this.props.match.params.data) +"'"
                })
                data_filter = _.filter(this.props.state_group, function(o) {return o.namess === type_value});
                data = this.queueList(
                  data_filter,
                  this.props.queues,
                  this.props.match.params.branch,
                  this.props.match.params.queue
                );
              }

              if(data.length>0){
                this.setState({data: data});
                this.branchInfo(this.props.match.params.branch);
              }
            }
            break;
          case 'infobranch':
            if(this.props.queues && this.props.queue_group){
              type_value = this.props.match.params.data;
              if(type_value === 'queues' && this.props.queue_group){
                if(this.props.queue_group.length>0){
                  this.props.queue_group.map(function(item){
                      return data_filter.push(item.tickets);
                  })
                  data_filter = flatten(data_filter);
                  tickets_new = _.filter(data_filter, function(o) {return o.state === 'NEW' || o.state === 'INSERVICE'});
                  this.setState({
                    header: "Показатели по ожиданию и обслуживанию клиентов"
                  });
                  console.log(tickets_new);
                  data = this.queueList(
                    [{tickets: tickets_new}],
                    this.props.queues,
                    this.props.match.params.branch,
                    this.props.match.params.queue
                  );
                  console.log(data);
                  this.setState({data: data});
                  this.branchInfo(this.props.match.params.branch);
                }
              }
            }
          break;
        default:
          break;
      }
    }
  }
  componentWillReceiveProps(props){
    if(props.match.params.type){
      var type_value = false,
          data = [],
          data_filter = [];
      switch(props.match.params.type) {
        case 'state':
          if(props.queues && props.state_group){
            type_value = props.match.params.data;
            this.setState({
              header: "Количество билетов со статусом '" + decodeURI(props.match.params.data) +"'"
            });
            data_filter = _.filter(props.state_group, function(o) {return o.namess === type_value});
            data = this.queueList(
              data_filter,
              props.queues,
              props.match.params.branch,
              props.match.params.queue
            );

            if(data.length>0){
              this.setState({data: data});
              this.branchInfo(props.match.params.branch);
            }
          }
          break;
        case 'raiting':
          if(props.queues && props.rating_group){
            type_value = props.match.params.data;
            this.setState({
              header: "Количество билетов по оценке '" + decodeURI(props.match.params.data) +"'"
            });
            data_filter = _.filter(props.rating_group, function(o) {return o.rates === type_value});
            data = this.queueList(
              data_filter,
              props.queues,
              props.match.params.branch,
              props.match.params.queue
            );

            if(data.length>0){
              this.setState({data: data});
              this.branchInfo(props.match.params.branch);
            }
          }
          break;
        case 'employee':
          if(props.queues && props.employee_group){
              type_value = props.match.params.data;
              var employee_arr = false;
            for (var i = 0; i <= props.employee_group.length-1; i++) {
              for (var s = 0; s <= props.employee_group[i].employee.length-1; s++) {
                if(parseInt(props.employee_group[i].employee[s].employee_id,10) === parseInt(type_value,10)){
                  employee_arr = props.employee_group[i].employee[s];
                  break;
                }
              }
            }
            if(employee_arr){
              this.setState({
                header: "Количество билетов по сотруднику '" + decodeURI(employee_arr.employee) +"'"
              })
              data = this.queueList(
                [{tickets: employee_arr.tickets}],
                props.queues,
                props.match.params.branch,
                props.match.params.queue
              );
              if(data.length>0){
                this.setState({data: data});
              }
            }
          }
          break;
        case 'branch':
          if(props.queues && props.state_group){
            type_value = props.match.params.data;
            if(type_value === 'waitover' && props.overWaits_group){
              if(props.overWaits_group.length>0){
                props.overWaits_group.map(function(item){
                    return data_filter.push(item.tickets);
                })
                data_filter = flatten(data_filter);
                var tickets_new = _.filter(data_filter, function(o) {return o.state === 'NEW'});
                this.setState({
                  header: "Количество билетов со статусом 'Ожидающие больше норматива'"
                });
                data = this.queueList(
                  [{tickets: tickets_new}],
                  props.queues,
                  props.match.params.branch,
                  props.match.params.queue
                );
              }
            }else{
              this.setState({
                header: "со статусом '" + decodeURI(props.match.params.data) +"'"
              })
              data_filter = _.filter(props.state_group, function(o) {return o.namess === type_value});
              data = this.queueList(
                data_filter,
                props.queues,
                props.match.params.branch,
                props.match.params.queue
              );
            }

            if(data.length>0){
              this.setState({data: data});
              this.branchInfo(props.match.params.branch);
            }
          }
          break;
        default:
        break;
    }
    }
  }
  render() {
    const expandedRowRender = (record, index, indent, expanded) => {
      const columns = [
        { title: 'Номер билета', dataIndex: 'ticketno', key: 'ticketno' },
        { title: 'Оператор', dataIndex: 'operator', key: 'operator' },
        {
          title: 'Время регистрации билета',
          dataIndex: 'starttime',
          key: 'starttime',
          render: (text, record) => {
            if(parseInt(text,10)>1000){
              var hours = new Date((parseInt(text,10)/1000)*1000).getHours(),
                  minutes = new Date((parseInt(text,10)/1000)*1000).getMinutes();
              if(hours === 6 && minutes === 0){
                return '--';
              }else{
                return hours + ":"  + minutes;
              }
            }else{
              return '--'
            }


          }
        },
        {
          title: 'Начало обслуживания',
          dataIndex: 'startservtime',
          key: 'startservtime',
          render: (text, record) => {
            var hours = new Date((parseInt(text,10)/1000)*1000).getHours(),
                minutes = new Date((parseInt(text,10)/1000)*1000).getMinutes();
            if(hours === 6 && minutes === 0){
              return '--';
            }else{
              return hours + ":"  + minutes;
            }
          }
        },
        {
          title: 'Время окончания обслуживания',
          dataIndex: 'stopservtime',
          key: 'stopservtime',
          render: (text, record) => {
            var hours = new Date((parseInt(text,10)/1000)*1000).getHours(),
                minutes = new Date((parseInt(text,10)/1000)*1000).getMinutes();
            if(hours === 6 && minutes === 0){
              return '--';
            }else{
              return hours + ":"  + minutes;
            }
          }
        }
      ];
      return (
        <Table
          columns={columns}
          dataSource={record.tickets}
          pagination={false}
        />
      );
    };
    const columns = [
      { title: 'Услуга', dataIndex: 'w_name', key: 'w_name' },
      { title: 'Количество', dataIndex: 'count', key: 'count' },
      { title: 'Ожидающие', dataIndex: 'wait_tickets', key: 'wait_tickets' },
      { title: 'Обслуживающиеся', dataIndex: 'inservice_tickets', key: 'inservice_tickets' },
      { title: 'Ожидающие больше норматива', dataIndex: 'waitover_tickets', key: 'waitover_tickets' }
     ];
    return (
      <div>
        {
          this.state.data.length > 0 ?
          <Card>
            <CardHeader>
              {this.state.header}
              {
                this.props.match.params.type==='state' ?
                  <div className="card-header-actions">
                    <h4><Badge className="mr-1" color="primary">Филиал: {this.state.filial_name}; Отделение: {this.state.branch_name}</Badge></h4>
                  </div>
                :
                  false
              }

            </CardHeader>
            <CardBody>
              <Table
                  className="components-table-demo-nested"
                  columns={columns}
                  expandedRowRender={expandedRowRender}
                  dataSource={this.state.data}
                  pagination={{ pageSize: 20 }}
              />
            </CardBody>
          </Card>
          :
            <h4>Нету билетов</h4>
        }

      </div>
    )
  }
}

export default QueueChildDetailTable;
