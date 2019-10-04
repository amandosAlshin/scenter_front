import React, { Component } from 'react';
import {  Card, CardBody, CardHeader } from 'reactstrap';
import { branchGroup,flatten } from './branchGroup'
import {
  Chart,
  Geom,
  Axis,
  Legend,
  Tooltip
} from "bizcharts";
var _ = require('lodash');
class BranchDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      header: false
    }
    this.clickFilial = this.clickFilial.bind(this)
  }
  branchList(tickets,branchs){
    if(tickets.length>0 && branchs.length>0){
      var br_g=branchGroup(tickets[0].tickets,branchs);
      return br_g;
    }else{
      return false;
    }
  }
  componentWillMount(){
    if(this.props.match.params.type){
      var type_value=false,
          data_filter=[],
          queue=[],
          data_filter_parent=[],
          data_filter_child=[],
          data=[];
      switch(this.props.match.params.type) {
        case 'state':
          if(this.props.branchs && this.props.state_group){
            type_value = this.props.match.params.data;
            this.setState({
              header: "Количество билетов со статусом  '" + decodeURI(this.props.match.params.data) +"'"
            });
            data_filter = _.filter(this.props.state_group, function(o) {return o.namess === type_value});
            data = this.branchList(
              data_filter,
              this.props.branchs
            );
            if(data){
              if(data.length===1){
                this.props.history.push(`/detail/branch-child/${data[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
              }else{
                this.setState({data: data});
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
                  if(data.length===1){
                    this.props.history.push(`/detail/branch-table-child/${data[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
                  }else{
                    this.setState({data: data});
                  }
                }
              }

            }
        break;
        case 'waitover':
          if(this.props.queues && this.props.overWaits_group){
            type_value = this.props.match.params.data;
            queue = _.filter(this.props.queues, function(o) {return parseInt(o.F_ID,10) === parseInt(type_value,10)})
            if(queue.length>0){
              this.setState({
                header: "Количество билетов по услуге "+queue[0].F_NAME
              });
              data_filter_parent = _.filter(this.props.overWaits_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID_PARENT,10)});

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
                if(data.length===1){
                  this.props.history.push(`/detail/branch-table-child/${data[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
                }else{
                  this.setState({data: data});
                }
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
                header: "Количество билетов по услуге "+queue[0].F_NAME
              });
              data_filter_parent = _.filter(this.props.waits_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID_PARENT,10)});

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
                if(data.length===1){
                  this.props.history.push(`/detail/branch-table-child/${data[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
                }else{
                  this.setState({data: data});
                }
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
                header: "Количество билетов по услуге "+queue[0].F_NAME
              });
              data_filter_parent = _.filter(this.props.serv_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID_PARENT,10)});

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
                if(data.length===1){
                  this.props.history.push(`/detail/branch-table-child/${data[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
                }else{
                  this.setState({data: data});
                }
              }
            }
          }
        break;
        case 'branch':
          if(this.props.branchs && this.props.state_group){
            type_value = this.props.match.params.data;
            if(type_value === 'waitover' && this.props.overWaits_group){
              if(this.props.overWaits_group.length>0){
                this.props.overWaits_group.map(function(item){
                    return data_filter.push(item.tickets);
                })
                data_filter = flatten(data_filter);
                var tickets_new = _.filter(data_filter, function(o) {return o.state === 'NEW'});
                this.setState({
                  header: "Количество билетов со статусом  'Ожидающие больше норматива'"
                });
                data = this.branchList(
                  [{tickets: tickets_new}],
                  this.props.branchs
                );
              }
            }else{
              data_filter = _.filter(this.props.state_group, function(o) {return o.namess === type_value});
              this.setState({
                header: "Количество билетов со статусом  '" + decodeURI(this.props.match.params.data) +"'"
              });
              data = this.branchList(
                data_filter,
                this.props.branchs
              );
            }
            if(data){
              if(data.length===1){
                this.props.history.push(`/detail/branch-child/${data[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
              }else{
                this.setState({data: data});
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
      var data_filter=[],
          data=[],
          type_value=false,
          data_filter_parent=[],
          queue=[],
          data_filter_child=[];
      switch(props.match.params.type) {
        case 'state':
          if(props.branchs && props.state_group){
            type_value = props.match.params.data;
            this.setState({
              header: "Количество билетов со статусом  '" + decodeURI(props.match.params.data) +"'"
            });
            data_filter = _.filter(props.state_group, function(o) {return o.namess === type_value});
            data = this.branchList(
              data_filter,
              props.branchs
            );
            if(data){
              if(data.length===1){
                props.history.push(`/detail/branch-child/${data[0].f_id}/${props.match.params.type}/${props.match.params.data}`);
              }else{
                this.setState({data: data});
              }
            }
          }
          break;
        case 'queue':
          if(props.branchs && props.queue_group){
            type_value = props.match.params.data;
            queue = _.filter(props.queues, function(o) {return parseInt(o.F_ID,10) === parseInt(type_value,10)})
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
                if(data.length===1){
                  props.history.push(`/detail/branch-table-child/${data[0].f_id}/${props.match.params.type}/${props.match.params.data}`);
                }else{
                  this.setState({data: data});
                }
              }
            }

          }
          break;
        case 'waitover':
          if(props.queues && props.overWaits_group){
            type_value = props.match.params.data;
            queue = _.filter(props.queues, function(o) {return parseInt(o.F_ID,10) === parseInt(type_value,10)})
            if(queue.length>0){
              this.setState({
                header: "Количество билетов по услуге "+queue[0].F_NAME
              });
              data_filter_parent = _.filter(props.overWaits_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID_PARENT,10)});

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
                if(data.length===1){
                  props.history.push(`/detail/branch-child/${data[0].f_id}/${props.match.params.type}/${props.match.params.data}`);
                }else{
                  this.setState({data: data});
                }
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
                header: "Количество билетов по услуге "+queue[0].F_NAME
              });
              data_filter_parent = _.filter(props.waits_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID_PARENT,10)});

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
                if(data.length===1){
                  props.history.push(`/detail/branch-child/${data[0].f_id}/${props.match.params.type}/${props.match.params.data}`);
                }else{
                  this.setState({data: data});
                }
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
                header: "Количество билетов по услуге "+queue[0].F_NAME
              });
              data_filter_parent = _.filter(props.serv_group, function(o) {return parseInt(o.idss,10) === parseInt(queue[0].F_ID_PARENT,10)});

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
                if(data.length===1){
                  props.history.push(`/detail/branch-child/${data[0].f_id}/${props.match.params.type}/${props.match.params.data}`);
                }else{
                  this.setState({data: data});
                }
              }
            }
          }
        break;
        case 'branch':
          if(props.branchs && props.state_group){
            type_value = props.match.params.data;
            if(type_value === 'waitover' && props.overWaits_group){
              if(props.overWaits_group.length>0){
                props.overWaits_group.map(function(item){
                    return data_filter.push(item.tickets);
                })
                data_filter = flatten(data_filter);
                var tickets_new = _.filter(data_filter, function(o) {return o.state === 'NEW'});
                this.setState({
                  header: "Количество билетов со статусом  'Ожидающие больше норматива'"
                });
                data = this.branchList(
                  [{tickets: tickets_new}],
                  props.branchs
                );
              }
            }else{
              data_filter = _.filter(props.state_group, function(o) {return o.namess === type_value});
              this.setState({
                header: "Количество билетов со статусом  '" + decodeURI(props.match.params.data) +"'"
              });
              data = this.branchList(
                data_filter,
                props.branchs
              );
            }
            if(data){
              if(data.length===1){
                props.history.push(`/detail/branch-child/${data[0].f_id}/${props.match.params.type}/${props.match.params.data}`);
              }else{
                this.setState({data: data});
              }
            }
          }
        break;
        default:
          break;
      }
    }
  }
  clickFilial(e){
    var filial_id=[];
    switch(this.props.match.params.type) {
      case 'state':
        filial_id = _.filter(this.state.data, function(o) {return o.f_name === e.item.dataValue});
        if(filial_id.length>0){
          this.props.history.push(`/detail/branch-child/${filial_id[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
        }
      break;
      case 'queue':
        filial_id = _.filter(this.state.data, function(o) {return o.f_name === e.item.dataValue});
        if(filial_id.length>0){
          this.props.history.push(`/detail/branch-table-child/${filial_id[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
        }
      break;
      case 'waitover':
        filial_id = _.filter(this.state.data, function(o) {return o.f_name === e.item.dataValue});
        if(filial_id.length>0){
          this.props.history.push(`/detail/branch-table-child/${filial_id[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
        }
      break;
      case 'waits':
        filial_id = _.filter(this.state.data, function(o) {return o.f_name === e.item.dataValue});
        if(filial_id.length>0){
          this.props.history.push(`/detail/branch-table-child/${filial_id[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
        }
      break;
      case 'serv':
        filial_id = _.filter(this.state.data, function(o) {return o.f_name === e.item.dataValue});
        if(filial_id.length>0){
          this.props.history.push(`/detail/branch-table-child/${filial_id[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
        }
      break;
      case 'branch':
        filial_id = _.filter(this.state.data, function(o) {return o.f_name === e.item.dataValue});
        if(this.props.match.params.data === 'waitover'){
          if(filial_id.length>0){
            this.props.history.push(`/detail/branch-child/${filial_id[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
          }
        }else{
          if(filial_id.length>0){
            this.props.history.push(`/detail/branch-child/${filial_id[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
          }
        }

      break;
      default:
        break;

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
        </CardHeader>
        <CardBody>
          {
            this.state.data.length > 0 ?
              this.props.match.params.type ==='waits' ?
                <Chart height={400} data={this.state.data} scale={cols} forceFit>
                  <Axis name="f_name" />
                  <Axis name="waits" />
                  <Tooltip
                    showTitle={false}
                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>Ср. вр. ож: {value} мин.</li>"
                  />
                  <Legend
                      onClick={this.clickFilial}
                   />
                  <Geom type="interval" value="f_id" position="f_name*waits" color="f_name" />
                </Chart>
              :
              this.props.match.params.type ==='serv'?
              <Chart height={400} data={this.state.data} scale={cols} forceFit>
                <Axis name="f_name" />
                <Axis name="serv" />
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>Ср. вр. об.: {value} мин.</li>"
                />
                <Legend
                    onClick={this.clickFilial}
                 />
                <Geom type="interval" value="f_id" position="f_name*serv" color="f_name" />
              </Chart>
              :
                <Chart height={400} data={this.state.data} scale={cols} forceFit>
                  <Axis name="f_name" />
                  <Axis name="count" />
                  <Tooltip
                    showTitle={false}
                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>Количество: {value}</li>"
                  />
                  <Legend
                      onClick={this.clickFilial}
                   />
                  <Geom type="interval" value="f_id" position="f_name*count" color="f_name" />
                </Chart>
            :
              <h4>Билетов не найдено</h4>
          }
        </CardBody>
      </Card>
    )
  }
}

export default BranchDetail;
