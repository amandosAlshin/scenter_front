import React, { Component } from 'react';
import {  Card, CardBody, CardHeader,Badge} from 'reactstrap';
import { branchChildGroup,flatten } from './branchGroup'
import {
  Chart,
  Geom,
  Axis,
  Legend,
  Tooltip
} from "bizcharts";
import DataSet from "@antv/data-set";
var _ = require('lodash');
class ChildBranch extends Component {
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
          data=false,
          filial=false,
          branch=[],
          data_filter = [],
          filial_info=[];
      switch(this.props.match.params.type) {
        case 'state':
          if(this.props.branchs && this.props.state_group){
            type_value = this.props.match.params.data;
            this.setState({
              header: "Количество билетов со статусом  '" + decodeURI(this.props.match.params.data) +"'"
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
                if(branch.length===1){
                  this.props.history.push(`/detail/queue-parent/${branch[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
                }else{
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
          }
          break;
        case 'raiting':
          if(this.props.branchs && this.props.rating_group){
            type_value = this.props.match.params.data;
            this.setState({
              header: "Количество билетов по оценке  '" + decodeURI(this.props.match.params.data) +"'"
            })
            data_filter = _.filter(this.props.rating_group, function(o) {return o.rates === type_value});
            data = this.branchList(
              data_filter,
              this.props.branchs
            );
            if(data){
              filial = this.props.match.params.filial;
              branch = _.filter(data, function(o) {return parseInt(o.f_parent_id,10) === parseInt(filial,10)});
              if(branch){
                if(branch.length===1){
                  this.props.history.push(`/detail/queue-parent/${branch[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
                }else{
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
          }
          break;
        case 'queue':
          if(this.props.branchs && this.props.queue_group){
            type_value = this.props.match.params.data;
            var queue = _.filter(this.props.queues, function(o) {return parseInt(o.F_ID,10) === parseInt(type_value,10)})
            if(queue.length>0){
              this.setState({
                header: "Количество билетов по услуге '"+queue[0].F_NAME+"'"
              });
              var data_filter_parent = _.filter(this.props.queue_group, function(o) {return o.idss === queue[0].F_ID_PARENT});

              var data_filter_child = _.filter(data_filter_parent[0].tickets, function(o) {return parseInt(o.idqueue,10) === parseInt(queue[0].F_ID,10)});
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
        case 'branch':
          if(this.props.branchs && this.props.state_group){
            type_value = this.props.match.params.data;
            if(type_value === 'waitover' && this.props.overWaits_group){
              if(this.props.overWaits_group.length>0){
                this.props.overWaits_group.map(function(item){
                    return data_filter.push(item.tickets);
                })
                data_filter = flatten(data_filter)
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
              this.setState({
                header: "со статусом  '" + decodeURI(this.props.match.params.data) +"'"
              })
              data_filter = _.filter(this.props.state_group, function(o) {return o.namess === type_value});
              data = this.branchList(
                data_filter,
                this.props.branchs
              );
            }
            if(data){
              filial = this.props.match.params.filial;
              branch = _.filter(data, function(o) {return parseInt(o.f_parent_id,10) === parseInt(filial,10)});
              if(branch){
                if(branch.length===1){
                  this.props.history.push(`/detail/queue-parent/${data[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
                }else{
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
          }
          break;
        case 'infobranch':
          if(this.props.branchs && this.props.branch_group){
            type_value = this.props.match.params.data;
            if(type_value === 'branch' && this.props.branch_group){
              if(this.props.branch_group.length>0){
                filial = this.props.match.params.filial;
                var infobranch = _.filter(this.props.branch_group, function(o) {return parseInt(o.f_id,10) === parseInt(filial,10)});
                filial_info = _.filter(this.props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(filial,10)});
                if(filial_info.length>0){
                  this.setState({filial_name: filial_info[0].F_NAME});
                }else{
                    this.setState({filial_name: 'Филиал не найден'});
                }
                this.setState({
                  header: "Показатели по ожиданию и обслуживанию клиентов ",
                  data: infobranch[0].children
                });
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
      var data=false,
          filial=false,
          branch=[],
          filial_info=[],
          data_filter=[],
          data_filter_parent = 0,
          data_filter_child = 0,
          type_value=false;
      switch(props.match.params.type) {
        case 'state':
          if(props.branchs && props.state_group){
            type_value = props.match.params.data;
            this.setState({
              header: "Количество билетов со статусом  '" + decodeURI(props.match.params.data) +"'"
            })
            data_filter = _.filter(props.state_group, function(o) {return o.namess === type_value});
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
        case 'raiting':
          if(props.branchs && props.rating_group){
            type_value = props.match.params.data;
            this.setState({
              header: "Количество билетов по оценке  '" + decodeURI(props.match.params.data) +"'"
            })
            data_filter = _.filter(props.rating_group, function(o) {return o.rates === type_value});
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
            var queue = _.filter(this.props.queues, function(o) {return parseInt(o.F_ID,10) === parseInt(type_value,10)})
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
        case 'branch':
          if(props.branchs && props.state_group){
            type_value = props.match.params.data;
            if(type_value === 'waitover' && props.overWaits_group){
              if(props.overWaits_group.length>0){
                props.overWaits_group.map(function(item){
                    return data_filter.push(item.tickets);
                })
                data_filter = flatten(data_filter)
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
              this.setState({
                header: "со статусом  '" + decodeURI(props.match.params.data) +"'"
              })
              data_filter = _.filter(props.state_group, function(o) {return o.namess === type_value});
              data = this.branchList(
                data_filter,
                props.branchs
              );
            }
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
        case 'infobranch':
          if(props.branchs && props.branch_group){
            type_value = props.match.params.data;
            if(type_value === 'branch' && props.branch_group){
              if(props.branch_group.length>0){
                filial = props.match.params.filial;
                var infobranch = _.filter(props.branch_group, function(o) {return parseInt(o.f_id,10) === parseInt(filial,10)});
                filial_info = _.filter(props.branchs, function(o) {return parseInt(o.F_ID,10) === parseInt(filial,10)});
                if(filial_info.length>0){
                  this.setState({filial_name: filial_info[0].F_NAME});
                }else{
                    this.setState({filial_name: 'Филиал не найден'});
                }
                this.setState({
                  header: "Показатели по ожиданию и обслуживанию клиентов ",
                  data: infobranch[0].children
                });
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
    var branch_id = [];
    switch(this.props.match.params.type) {
      case 'state':
        branch_id = _.filter(this.state.data, function(o) {return o.f_name === e.item.dataValue});
        if(branch_id.length>0){
          this.props.history.push(`/detail/queue-parent/${branch_id[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
        }
      break;
      case 'raiting':
        branch_id = _.filter(this.state.data, function(o) {return o.f_name === e.item.dataValue});
        if(branch_id.length>0){
          this.props.history.push(`/detail/queue-parent/${branch_id[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
        }
      break;
      case 'queue':
        branch_id = _.filter(this.state.data, function(o) {return o.f_name === e.item.dataValue});
        if(branch_id.length>0){
          this.props.history.push(`/detail/queue-parent/${branch_id[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
        }
      break;
      case 'branch':
        branch_id = _.filter(this.state.data, function(o) {return o.f_name === e.item.dataValue});
        if(branch_id.length>0){
          this.props.history.push(`/detail/queue-parent/${branch_id[0].f_id}/${this.props.match.params.type}/${this.props.match.params.data}`);
        }
      break;
      case 'infobranch':
        branch_id = _.filter(this.state.data, function(o) {return o.f_name === e});
        if(branch_id.length>0){
          this.props.history.push(`/detail/queue-parent/${branch_id[0].f_id}/${this.props.match.params.type}/queues`);
        }
      break;
      default:
        break;

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
          <div className="card-header-actions">
            <h4><Badge className="mr-1" color="primary">Филиал: {this.state.filial_name}</Badge></h4>
          </div>
        </CardHeader>
        <CardBody>
          {
            this.props.match.params.type === 'infobranch' ?
              <Chart
                height={400}
                data={this.chartData(this.state.data)}
                forceFit
                onAxisLabelClick={(e)=>{this.clickBranch(e.target._attrs.text)}}
              >
                  <Axis name="f_name" />
                  <Axis name="value" />
                  <Tooltip
                    crosshairs={{
                      type: "y"
                    }}
                  />
                  <Geom
                    type="interval"
                    position="f_name*value"
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
              <Chart
                height={400}
                data={this.state.data}
                scale={cols}
                forceFit
                padding={[40, 40, 80, 40]}
              >
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>Количество: {value}</li>"
                />
                <Legend onClick={this.clickBranch}/>
                <Geom
                  type="interval"
                  position="f_name*count"
                  color="f_name"
                  style={{
                  lineWidth: 1,
                  stroke: "#fff"
                }}
                />
                <Axis name="count" />
              </Chart>
          }

        </CardBody>
      </Card>

    )
  }
}

export default ChildBranch;
