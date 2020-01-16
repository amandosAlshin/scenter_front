import React, { Component } from 'react';
import {  Card, CardBody, CardHeader,Badge } from 'reactstrap';
import {
  Chart,
  Geom,
  Axis,
  Legend,
  Tooltip
} from "bizcharts";
import { queueGroup,flatten } from './queueGroup'
import DataSet from "@antv/data-set";
var _ = require('lodash');
class QueueDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      filial_name: false,
      branch_name: false,
      header: false
    }
    this.clickChild = this.clickChild.bind(this)
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
  queueList(tickets,queues,branch){
    if(tickets.length>0 && queues.length>0){
      var br_g=queueGroup(tickets[0].tickets,queues,branch);
      return br_g;
    }else{
      return false;
    }
  }
  chartData(data){
     const ds = new DataSet();
     const dv = ds.createView().source(data)
     dv.transform({
      type: "fold",
      fields: ["Ожидающие", "Обслуживающиеся", "Ожидающие больше норматива"],
      key: "type",
      value: "value"
    });
    return dv;

  }
  componentWillMount(){
      if(this.props.match.params.type){
        var type_value = false,
            data_filter=[],
            data = [];
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
              );
              if(data.length===1){
                this.props.history.push(`/detail/queue-table-child/${this.props.match.params.branch}/${data[0].idss}/${this.props.match.params.type}/${this.props.match.params.data}`);
              }else{
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
              );
              if(data.length===1){
                this.props.history.push(`/detail/queue-table-child/${this.props.match.params.branch}/${data[0].idss}/${this.props.match.params.type}/${this.props.match.params.data}`);
              }else{
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
                );
                if(data.length===1){
                  this.props.history.push(`/detail/queue-table-child/${this.props.match.params.branch}/${data[0].idss}/${this.props.match.params.type}/${this.props.match.params.data}`);
                }else{
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
                    this.props.match.params.branch
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
                );
              }

              if(data.length===1){
                this.props.history.push(`/detail/queue-table-child/${this.props.match.params.branch}/${data[0].idss}/${this.props.match.params.type}/${this.props.match.params.data}`);
              }else{
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
                    header: "Показатели по ожиданию и обслуживанию клиентов'"
                  });
                  data = this.queueList(
                    [{tickets: tickets_new}],
                    this.props.queues,
                    this.props.match.params.branch
                  );
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
      var data_filter=[];
        switch(props.match.params.type) {
          case 'state':
            if(props.queues && props.state_group){
              var type_value = props.match.params.data;
              this.setState({
                header: "Количество билетов со статусом '" + decodeURI(props.match.params.data) +"'"
              })
              data_filter = _.filter(props.state_group, function(o) {return o.namess === type_value});
              var data = this.queueList(
                data_filter,
                props.queues,
                props.match.params.branch,
              );
              if(data.length===1){
                props.history.push(`/detail/queue-table-child/${props.match.params.branch}/${data[0].idss}/${props.match.params.type}/${props.match.params.data}`);
              }else{
                this.setState({data: data});
                this.branchInfo(this.props.match.params.branch);
              }
            }
          break;
          case 'raiting':
            if(props.queues && props.rating_group){
              type_value = props.match.params.data;
              this.setState({
                header: "Количество билетов по оценке '" + decodeURI(props.match.params.data) +"'"
              })
              data_filter = _.filter(props.rating_group, function(o) {return o.rates === type_value});
              data = this.queueList(
                data_filter,
                props.queues,
                props.match.params.branch,
              );
              if(data.length===1){
                props.history.push(`/detail/queue-table-child/${props.match.params.branch}/${data[0].idss}/${props.match.params.type}/${props.match.params.data}`);
              }else{
                this.setState({data: data});
                this.branchInfo(this.props.match.params.branch);
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
                );
                if(data.length===1){
                  props.history.push(`/detail/queue-table-child/${props.match.params.branch}/${data[0].idss}/${props.match.params.type}/${props.match.params.data}`);
                }else{
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
                    props.match.params.branch
                  );
                }
              }else{
                this.setState({
                  header: "Количество билетов со статусом '" + decodeURI(props.match.params.data) +"'"
                })
                data_filter = _.filter(props.state_group, function(o) {return o.namess === type_value});
                data = this.queueList(
                  data_filter,
                  props.queues,
                  props.match.params.branch,
                );
              }

              if(data.length===1){
                props.history.push(`/detail/queue-table-child/${props.match.params.branch}/${data[0].idss}/${props.match.params.type}/${props.match.params.data}`);
              }else{
                this.setState({data: data});
                this.branchInfo(props.match.params.branch);
              }
            }
          break;
          case 'infobranch':
            if(props.queues && props.queue_group){
              type_value = props.match.params.data;
              if(type_value === 'queues' && props.queue_group){
                if(props.queue_group.length>0){
                  props.queue_group.map(function(item){
                      return data_filter.push(item.tickets);
                  })
                  data_filter = flatten(data_filter);
                  tickets_new = _.filter(data_filter, function(o) {return o.state === 'NEW' || o.state === 'INSERVICE'});
                  this.setState({
                    header: "Показатели по ожиданию и обслуживанию клиентов "
                  });
                  data = this.queueList(
                    [{tickets: tickets_new}],
                    props.queues,
                    props.match.params.branch
                  );
                  this.setState({data: data});
                  this.branchInfo(props.match.params.branch);
                }
              }
            }
        break;
        default:
          break;
      }
    }
  }
  clickChild(e){
      var queue_id = _.filter(this.state.data, function(o) {return o.w_name === e.item.dataValue});
      if(queue_id.length>0){
        this.props.history.push(`/detail/queue-table-child/${this.props.match.params.branch}/${queue_id[0].idss}/${this.props.match.params.type}/${this.props.match.params.data}`);
      }
  }
  clickState(e){
    var queue_id=[];
    switch(this.props.match.params.type) {
      case 'Ожидающие':
        queue_id = _.filter(this.state.data, function(o) {return o.w_name === e.item.dataValue});
        if(queue_id.length>0){
          this.props.history.push(`/detail/queue-table-child/${this.props.match.params.branch}/${queue_id[0].idss}/${this.props.match.params.type}/${this.props.match.params.data}`);
        }
      break;
      case 'Обслуживающиеся':
        queue_id = _.filter(this.state.data, function(o) {return o.w_name === e.item.dataValue});
        if(queue_id.length>0){
          this.props.history.push(`/detail/queue-table-child/${this.props.match.params.branch}/${queue_id[0].idss}/${this.props.match.params.type}/${this.props.match.params.data}`);
        }
      break;
      case 'Ожидающие больше норматива':
        queue_id = _.filter(this.state.data, function(o) {return o.w_name === e.item.dataValue});
        if(queue_id.length>0){
          this.props.history.push(`/detail/queue-table-child/${this.props.match.params.branch}/${queue_id[0].idss}/${this.props.match.params.type}/${this.props.match.params.data}`);
        }
      break;
      default:
      break;
    }
    // var queue_id = _.filter(this.state.data, function(o) {return o.w_name === e.item.dataValue});
    // if(queue_id.length>0){
    //   this.props.history.push(`/detail/queue-table-child/${this.props.match.params.branch}/${queue_id[0].idss}/${this.props.match.params.type}/${this.props.match.params.data}`);
    // }
  }
  clickQueue(e){
    var queue_id = _.filter(this.state.data, function(o) {return o.w_name === e});
    if(queue_id.length>0){
      this.props.history.push(`/detail/queue-table-child/${this.props.match.params.branch}/${queue_id[0].idss}/${this.props.match.params.type}/${this.props.match.params.data}`);
    }
  }
  render() {
    const cols = {
      sales: {
        tickInterval: 20
      }
    };
    return (
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
          {
            this.props.match.params.type === 'infobranch' ?
              <Chart
                height={400}
                data={this.chartData(this.state.data)}
                forceFit
                onAxisLabelClick={(e)=>{this.clickQueue(e.target._attrs.text)}}
              >
                  <Axis name="f_work_name" />
                  <Axis name="value" />
                  <Tooltip
                    crosshairs={{
                      type: "y"
                    }}
                  />
                  <Geom
                    type="interval"
                    position="f_work_name*value"
                    color={"type"}
                    adjust={[
                      {
                        type: "dodge",
                        marginRatio: 1 / 32
                      }
                    ]}
                  />
                </Chart>
            :
              <Chart height={400} data={this.state.data} scale={cols} forceFit>
                <Axis name="w_name" />
                <Axis name="count" />
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>Количество: {value}</li>"
                />
                <Legend
                    onClick={this.clickChild}
                 />
                <Geom type="interval" value="idss" position="w_name*count" color="w_name" />
              </Chart>
          }
        </CardBody>
      </Card>
    )
  }
}

export default QueueDetail;
