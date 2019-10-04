import React, { Component } from 'react';
import {  Card, CardBody, CardHeader,Badge} from 'reactstrap';
import { branchChildGroup } from './branchGroup'
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
var _ = require('lodash');
class BranchChildDetailTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      filial_name: false,
      header: false
    }
    this.clickBranch = this.clickBranch.bind(this)
  }
  branchList(tickets,branchs){
    if(tickets.length>0 && branchs.length>0){
      var br_g=branchChildGroup(tickets[0].tickets,branchs);
      return br_g;
    }else{
      return false;
    }
  }
  componentWillMount(){
    if(this.props.match.params.type){
      var type_value=false,
          data_filter=[],
          filial_info=[],
          branch=[],
          queue=[],
          data_filter_parent=[],
          data_filter_child=[],
          filial=false,
          data=false;
      switch(this.props.match.params.type) {
        case 'state':
          if(this.props.branchs && this.props.state_group){
            type_value = this.props.match.params.data;
            this.setState({
              header: "Количество билетов со статусом '" + decodeURI(this.props.match.params.data) +"'"
            })
            data_filter = _.filter(this.props.state_group, function(o) {return o.namess === type_value});
            data = this.branchList(
              data_filter,
              this.props.branchs
            );
            if(data){
              filial = this.props.match.params.filial;
              branch = _.filter(data, function(o) {return parseInt(o.f_parent_id,10) === parseInt(filial,10)});
              if(branch){
                filial_info = _.filter(this.props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(filial,10)});
                if(filial_info.length>0){
                  this.setState({filial_name: filial_info[0].F_NAME});
                }else{
                    this.setState({filial_name: 'Филиал не найден'});
                }
                this.setState({data: branch});
              }
            }
          }
          break;
        case 'queue':
          if(this.props.branchs && this.props.queue_group){
            type_value = this.props.match.params.data;
            queue = _.filter(this.props.queues, function(o) {return parseInt(o.F_ID,10) === parseInt(type_value,10)})
            if(queue.length>0){
              this.setState({
                header: "Количество билетов по услуге '"+queue[0].F_NAME+"'"
              });
              data_filter_parent = _.filter(this.props.queue_group, function(o) {return o.idss === queue[0].F_ID_PARENT});
              if(data_filter_parent.length>0){
                data_filter_child = _.filter(data_filter_parent[0].tickets, function(o) {return parseInt(o.idqueue,10) === parseInt(queue[0].F_ID,10)});
              }else{
                data_filter_child =  _.filter(this.props.queue_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID,10)});
                if(data_filter_child.length>0){
                  data_filter_child = data_filter_child[0].tickets
                }
              }
              data = this.branchList(
                [{tickets: data_filter_child}],
                this.props.branchs
              );
              if(data){
                filial = this.props.match.params.filial;
                branch = _.filter(data, function(o) {return parseInt(o.f_parent_id,10) === parseInt(filial,10)});
                filial_info = _.filter(this.props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(filial,10)});
                if(filial_info.length>0){
                  this.setState({filial_name: filial_info[0].F_NAME});
                }else{
                    this.setState({filial_name: 'Филиал не найден'});
                }
                this.setState({data: branch});
              }
            }

          }
          break;
        case 'waitover':
          if(this.props.branchs && this.props.overWaits_group){
            type_value = this.props.match.params.data;
            queue = _.filter(this.props.queues, function(o) {return parseInt(o.F_ID,10) === parseInt(type_value,10)})
            if(queue.length>0){
              this.setState({
                header: "Количество билетов по услуге '"+queue[0].F_NAME+"'"
              });
              data_filter_parent = _.filter(this.props.overWaits_group, function(o) {return o.idss === queue[0].F_ID_PARENT});
              if(data_filter_parent.length>0){
                data_filter_child = _.filter(data_filter_parent[0].tickets, function(o) {return parseInt(o.idqueue,10) === parseInt(queue[0].F_ID,10)});
              }else{
                data_filter_child = _.filter(this.props.overWaits_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID,10)});
                if(data_filter_child.length>0){
                  data_filter_child = data_filter_child[0].tickets
                }
              }
              data = this.branchList(
                [{tickets: data_filter_child}],
                this.props.branchs
              );
              if(data){
                filial = this.props.match.params.filial;
                branch = _.filter(data, function(o) {return parseInt(o.f_parent_id,10) === parseInt(filial,10)});
                filial_info = _.filter(this.props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(filial,10)});
                if(filial_info.length>0){
                  this.setState({filial_name: filial_info[0].F_NAME});
                }else{
                    this.setState({filial_name: 'Филиал не найден'});
                }
                this.setState({data: branch});
              }
            }
          }
          break;
        case 'waits':
          if(this.props.branchs && this.props.waits_group){
            type_value = this.props.match.params.data;
            queue = _.filter(this.props.queues, function(o) {return parseInt(o.F_ID,10) === parseInt(type_value,10)})
            if(queue.length>0){
              this.setState({
                header: "Среднее время ожидание по услуге '"+queue[0].F_NAME+"'"
              });
              data_filter_parent = _.filter(this.props.waits_group, function(o) {return o.idss === queue[0].F_ID_PARENT});
              if(data_filter_parent.length>0){
                data_filter_child = _.filter(data_filter_parent[0].tickets, function(o) {return parseInt(o.idqueue,10) === parseInt(queue[0].F_ID,10)});
              }else{
                data_filter_child = _.filter(this.props.waits_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID,10)});
                if(data_filter_child.length>0){
                  data_filter_child = data_filter_child[0].tickets
                }
              }
              data = this.branchList(
                [{tickets: data_filter_child}],
                this.props.branchs
              );
              if(data){
                filial = this.props.match.params.filial;
                branch = _.filter(data, function(o) {return parseInt(o.f_parent_id,10) === parseInt(filial,10)});
                filial_info = _.filter(this.props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(filial,10)});
                if(filial_info.length>0){
                  this.setState({filial_name: filial_info[0].F_NAME});
                }else{
                    this.setState({filial_name: 'Филиал не найден'});
                }
                this.setState({data: branch});
              }
            }
          }
          break;
        case 'serv':
          if(this.props.branchs && this.props.serv_group){
            type_value = this.props.match.params.data;
            queue = _.filter(this.props.queues, function(o) {return parseInt(o.F_ID,10) === parseInt(type_value,10)})
            if(queue.length>0){
              this.setState({
                header: "Количество билетов по услуге '"+queue[0].F_NAME+"'"
              });
              data_filter_parent = _.filter(this.props.serv_group, function(o) {return o.idss === queue[0].F_ID_PARENT});
              if(data_filter_parent.length>0){
                data_filter_child = _.filter(data_filter_parent[0].tickets, function(o) {return parseInt(o.idqueue,10) === parseInt(queue[0].F_ID,10)});
              }else{
                data_filter_child = _.filter(this.props.serv_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID,10)});
                if(data_filter_child.length>0){
                  data_filter_child = data_filter_child[0].tickets
                }
              }
              data = this.branchList(
                [{tickets: data_filter_child}],
                this.props.branchs
              );
              if(data){
                filial = this.props.match.params.filial;
                branch = _.filter(data, function(o) {return parseInt(o.f_parent_id,10) === parseInt(filial,10)});
                filial_info = _.filter(this.props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(filial,10)});
                if(filial_info.length>0){
                  this.setState({filial_name: filial_info[0].F_NAME});
                }else{
                    this.setState({filial_name: 'Филиал не найден'});
                }
                this.setState({data: branch});
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
      var type_value=false,
          data=false,
          filial=false,
          data_filter_parent=[],
          data_filter_child=[],
          branch=[],
          queue=[],
          filial_info=[];
      switch(props.match.params.type) {
        case 'state':
          if(props.branchs && props.state_group){
            type_value = props.match.params.data;
            this.setState({
              header: "Количество билетов со статусом '" + decodeURI(props.match.params.data) +"'"
            })
            var data_filter = _.filter(props.state_group, function(o) {return o.namess === type_value});
            data = this.branchList(
              data_filter,
              props.branchs
            );
            if(data){
              filial = props.match.params.filial;
              branch = _.filter(data, function(o) {return parseInt(o.f_parent_id,10) === parseInt(filial,10)});
              if(branch){
                if(branch.length===1){
                  props.history.push(`/detail/queue-parent/${data[0].f_id}/${props.match.params.type}/${props.match.params.data}`);
                }else{
                  filial_info = _.filter(props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(filial,10)});
                  if(filial_info.length>0){
                    this.setState({filial_name: filial_info[0].F_NAME});
                  }else{
                      this.setState({filial_name: 'Филиал не найден'});
                  }
                  this.setState({data: branch});
                }
              }
            }
          }
          break;
        case 'queue':
          if(props.branchs && props.queue_group){
            type_value = props.match.params.data;
            queue = _.filter(this.props.queues, function(o) {return parseInt(o.F_ID,10) === parseInt(type_value,10)})
            if(queue.length>0){
              this.setState({
                header: "Количество билетов по услуге '"+queue[0].F_NAME+"'"
              });
              data_filter_parent = _.filter(props.queue_group, function(o) {return o.idss === queue[0].F_ID_PARENT});
              if(data_filter_parent.length>0){
                data_filter_child = _.filter(data_filter_parent[0].tickets, function(o) {return parseInt(o.idqueue,10) === parseInt(queue[0].F_ID,10)});
              }else{
                data_filter_child =  _.filter(props.queue_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID,10)});
                if(data_filter_child.length>0){
                  data_filter_child = data_filter_child[0].tickets
                }
              }
              data = this.branchList(
                [{tickets: data_filter_child}],
                props.branchs
              );
              if(data){
                filial = props.match.params.filial;
                branch = _.filter(data, function(o) {return parseInt(o.f_parent_id,10) === parseInt(filial,10)});
                if(branch.length===1){
                  props.history.push(`/detail/branch-child/${data[0].f_id}/${props.match.params.type}/${props.match.params.data}`);
                }else{
                  filial_info = _.filter(props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(filial,10)});
                  if(filial_info.length>0){
                    this.setState({filial_name: filial_info[0].F_NAME});
                  }else{
                      this.setState({filial_name: 'Филиал не найден'});
                  }
                  this.setState({data: branch});
                }
              }
            }
          }
          break;
        case 'waitover':
          if(props.branchs && props.overWaits_group){
            type_value = props.match.params.data;
            queue = _.filter(props.queues, function(o) {return parseInt(o.F_ID,10) === parseInt(type_value,10)})
            if(queue.length>0){
              this.setState({
                header: "Количество билетов по услуге '"+queue[0].F_NAME+"'"
              });
              data_filter_parent = _.filter(props.overWaits_group, function(o) {return o.idss === queue[0].F_ID_PARENT});
              if(data_filter_parent.length>0){
                data_filter_child = _.filter(data_filter_parent[0].tickets, function(o) {return parseInt(o.idqueue,10) === parseInt(queue[0].F_ID,10)});
              }else{
                data_filter_child = _.filter(props.overWaits_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID,10)});
                if(data_filter_child.length>0){
                  data_filter_child = data_filter_child[0].tickets
                }
              }
              data = this.branchList(
                [{tickets: data_filter_child}],
                props.branchs
              );
              if(data){
                filial = props.match.params.filial;
                branch = _.filter(data, function(o) {return parseInt(o.f_parent_id,10) === parseInt(filial,10)});
                filial_info = _.filter(props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(filial,10)});
                if(filial_info.length>0){
                  this.setState({filial_name: filial_info[0].F_NAME});
                }else{
                    this.setState({filial_name: 'Филиал не найден'});
                }
                this.setState({data: branch});
              }
            }
          }
          break;
        case 'waits':
          if(props.branchs && props.waits_group){
            type_value = props.match.params.data;
            queue = _.filter(props.queues, function(o) {return parseInt(o.F_ID,10) === parseInt(type_value,10)})
            if(queue.length>0){
              this.setState({
                header: "Среднее время ожидание по услуге '"+queue[0].F_NAME+"'"
              });
              data_filter_parent = _.filter(props.waits_group, function(o) {return o.idss === queue[0].F_ID_PARENT});
              if(data_filter_parent.length>0){
                data_filter_child = _.filter(data_filter_parent[0].tickets, function(o) {return parseInt(o.idqueue,10) === parseInt(queue[0].F_ID,10)});
              }else{
                data_filter_child = _.filter(props.waits_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID,10)});
                if(data_filter_child.length>0){
                  data_filter_child = data_filter_child[0].tickets
                }
              }
              data = this.branchList(
                [{tickets: data_filter_child}],
                props.branchs
              );
              if(data){
                filial = props.match.params.filial;
                branch = _.filter(data, function(o) {return parseInt(o.f_parent_id,10) === parseInt(filial,10)});
                filial_info = _.filter(props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(filial,10)});
                if(filial_info.length>0){
                  this.setState({filial_name: filial_info[0].F_NAME});
                }else{
                    this.setState({filial_name: 'Филиал не найден'});
                }
                console.log(branch);
                this.setState({data: branch});
              }
            }
          }
          break;
        case 'serv':
          if(props.branchs && props.serv_group){
            type_value = props.match.params.data;
            queue = _.filter(props.queues, function(o) {return parseInt(o.F_ID,10) === parseInt(type_value,10)})
            if(queue.length>0){
              this.setState({
                header: "Количество билетов по услуге '"+queue[0].F_NAME+"'"
              });
              data_filter_parent = _.filter(props.serv_group, function(o) {return o.idss === queue[0].F_ID_PARENT});
              if(data_filter_parent.length>0){
                data_filter_child = _.filter(data_filter_parent[0].tickets, function(o) {return parseInt(o.idqueue,10) === parseInt(queue[0].F_ID,10)});
              }else{
                data_filter_child = _.filter(props.serv_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID,10)});
                if(data_filter_child.length>0){
                  data_filter_child = data_filter_child[0].tickets
                }
              }
              data = this.branchList(
                [{tickets: data_filter_child}],
                props.branchs
              );
              if(data){
                filial = props.match.params.filial;
                branch = _.filter(data, function(o) {return parseInt(o.f_parent_id,10) === parseInt(filial,10)});
                filial_info = _.filter(props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(filial,10)});
                if(filial_info.length>0){
                  this.setState({filial_name: filial_info[0].F_NAME});
                }else{
                    this.setState({filial_name: 'Филиал не найден'});
                }
                this.setState({data: branch});
              }
            }
          }
          break;
        default:
          break;
      }
    }
  }
  clickBranch(e){
    switch(this.props.match.params.type) {
      case 'state':
        var branch_id = _.filter(this.state.data, function(o) {return o.f_name === e.item.dataValue});
        if(branch_id.length>0){
          this.props.history.push(`/detail/queue-parent/${branch_id[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
        }
      break;
      case 'queue':
      break;
      default:
        break;

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
    var columns=[];
      if(this.props.match.params.type ==='waits'){
        columns = [
          { title: 'Отделение', dataIndex: 'f_name', key: 'f_name' },
          { title: 'Ср. вр. ож. в минутах', dataIndex: 'waits', key: 'waits' }
         ];
      }else if (this.props.match.params.type ==='serv') {
        columns = [
          { title: 'Отделение', dataIndex: 'f_name', key: 'f_name' },
          { title: 'Ср. вр. об. в минутах', dataIndex: 'serv', key: 'serv' }
         ];
      }else{
        columns = [
          { title: 'Отделение', dataIndex: 'f_name', key: 'f_name' },
          { title: 'Количество', dataIndex: 'count', key: 'count' }
         ];
      }
    return (
      <div>
      {
        this.state.data.length > 0 ?
          <Card>
            <CardHeader>
              {this.state.header}
              <div className="card-header-actions">
                <h4><Badge className="mr-1" color="primary">Филиал: {this.state.filial_name}</Badge></h4>
              </div>
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

export default BranchChildDetailTable;
