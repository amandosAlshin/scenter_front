import React, { Component } from 'react';
import {  Card, CardBody, CardHeader} from 'reactstrap';
import { queueChildGroup } from './queueGroup'
import {
  Chart,
  Geom,
  Axis,
  Legend,
  Tooltip
} from "bizcharts";
var _ = require('lodash');
class Child extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      header: false,
      filial_name: false,
      branch_name: false,
    }
    this.clickChild = this.clickChild.bind(this)
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
      if(!br_g){
        return false;
      }
      var childQueue = [];
      if(parseInt(parent_queue,10) === parseInt(br_g[0].idss,10)){
        childQueue = br_g;
      }else{
        childQueue = _.filter(br_g, function(a){return parseInt(a.f_parent_id,10) === parseInt(parent_queue,10)});
      }
      return childQueue;
    }else{
      return false;
    }
  }
  componentWillMount(){
      if(this.props.match.params.type){
        var type_value=false,
            data_filter=[],
            data= false;
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
            case 'queue':
              if(this.props.queues && this.props.queue_group){
                type_value = this.props.match.params.data;
                this.setState({
                  header: "Количество билетов по услуге по услуге '" + decodeURI(this.props.match.params.data) +"'"
                })
                data_filter = _.filter(this.props.queue_group, function(o) {return o.w_name === type_value});
                if(data_filter.length>0){
                  data = this.queueList(
                    data_filter,
                    this.props.queues,
                    0,
                    data_filter[0].idss
                  );
                  if(data.length>0){
                    if(data.length===1){
                      this.props.history.push(`/detail/branch/${this.props.match.params.type}/${data[0].idss}`);
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
            this.setState({
              header: "Количество билетов по услуге '" + decodeURI(this.props.match.params.data) +"'"
            })
            data_filter = _.filter(this.props.overWaits_group, function(o) {return o.w_name === type_value});
            if(data_filter.length>0){
              data = this.queueList(
                data_filter,
                this.props.queues,
                0,
                data_filter[0].idss
              );
              if(data.length>0){
                if(data.length===1){
                  this.props.history.push(`/detail/branch/${this.props.match.params.type}/${data[0].idss}`);
                }else{
                  this.setState({data: data});
                }
              }
            }
          }
          break;
        case 'waits':
          if(this.props.queues && this.props.waits_group){
            type_value = this.props.match.params.data;
            this.setState({
              header: "Количество билетов по услуге '" + decodeURI(this.props.match.params.data) +"'"
            })
            data_filter = _.filter(this.props.waits_group, function(o) {return o.w_name === type_value});
            if(data_filter.length>0){
              data = this.queueList(
                data_filter,
                this.props.queues,
                0,
                data_filter[0].idss
              );
              if(data.length>0){
                if(data.length===1){
                  this.props.history.push(`/detail/branch/${this.props.match.params.type}/${data[0].idss}`);
                }else{
                  this.setState({data: data});
                }
              }
            }
          }
          break;
        case 'serv':
          if(this.props.queues && this.props.serv_group){
            type_value = this.props.match.params.data;
            this.setState({
              header: "Количество билетов по услуге '" + decodeURI(this.props.match.params.data) +"'"
            })
            data_filter = _.filter(this.props.serv_group, function(o) {return o.w_name === type_value});
            if(data_filter.length>0){
              data = this.queueList(
                data_filter,
                this.props.queues,
                0,
                data_filter[0].idss
              );
              if(data.length>0){
                if(data.length===1){
                  this.props.history.push(`/detail/branch/${this.props.match.params.type}/${data[0].idss}`);
                }else{
                  this.setState({data: data});
                }
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
          type_value=false,
          data=false;

      switch(props.match.params.type) {
        case 'state':
          if(props.queues && props.state_group){
            type_value = props.match.params.data;
            this.setState({
              header: "Количество билетов по услуге со статусом '" + decodeURI(props.match.params.data) +"'"
            })
            data_filter = _.filter(props.state_group, function(o) {return o.namess === type_value});
            data = this.queueList(
              data_filter,
              props.queues,
              props.match.params.branch,
              props.match.params.queue
            );
            if(data.length>0){
              this.setState({data: data});
            }
          }
          break;
          case 'queue':
            if(props.queues && props.queue_group){
              type_value = props.match.params.data;
              this.setState({
                header: "Количество билетов по услуге по услуге '" + decodeURI(props.match.params.data) +"'"
              })
              data_filter = _.filter(props.queue_group, function(o) {return o.w_name === type_value});
              if(data_filter.length>0){
                data = this.queueList(
                  data_filter,
                  props.queues,
                  0,
                  data_filter[0].idss
                );
                if(data.length>0){
                  if(data.length===1){
                    props.history.push(`/detail/branch/${props.match.params.type}/${data[0].idss}`);
                  }else{
                    this.setState({data: data});
                  }
                }
              }
            }
            break;
          case 'waitover':
            if(this.props.queues && props.overWaits_group){
              type_value = props.match.params.data;
              this.setState({
                header: "Количество билетов по услуге по услуге '" + decodeURI(props.match.params.data) +"'"
              })
              data_filter = _.filter(props.overWaits_group, function(o) {return o.w_name === type_value});
              if(data_filter.length>0){
                data = this.queueList(
                  data_filter,
                  props.queues,
                  0,
                  data_filter[0].idss
                );
                if(data.length>0){
                  if(data.length===1){
                    props.history.push(`/detail/branch/${props.match.params.type}/${data[0].idss}`);
                  }else{
                    this.setState({data: data});
                  }
                }
              }
            }
            break;
          case 'waits':
            if(this.props.queues && props.waits_group){
              type_value = props.match.params.data;
              this.setState({
                header: "Количество билетов по услуге по услуге '" + decodeURI(props.match.params.data) +"'"
              })
              data_filter = _.filter(props.waits_group, function(o) {return o.w_name === type_value});
              if(data_filter.length>0){
                data = this.queueList(
                  data_filter,
                  props.queues,
                  0,
                  data_filter[0].idss
                );
                if(data.length>0){
                  if(data.length===1){
                    props.history.push(`/detail/branch/${props.match.params.type}/${data[0].idss}`);
                  }else{
                    this.setState({data: data});
                  }
                }
              }
            }
            break;
          case 'serv':
            if(this.props.queues && props.serv_group){
              type_value = props.match.params.data;
              this.setState({
                header: "Количество билетов по услуге по услуге '" + decodeURI(props.match.params.data) +"'"
              })
              data_filter = _.filter(props.serv_group, function(o) {return o.w_name === type_value});
              if(data_filter.length>0){
                data = this.queueList(
                  data_filter,
                  props.queues,
                  0,
                  data_filter[0].idss
                );
                if(data.length>0){
                  if(data.length===1){
                    props.history.push(`/detail/branch/${props.match.params.type}/${data[0].idss}`);
                  }else{
                    this.setState({data: data});
                  }
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
        this.props.history.push(`/detail/branch/${this.props.match.params.type}/${queue_id[0].idss}`);
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
               <Chart
                 height={400}
                 data={this.state.data}
                 scale={cols}
                 padding={[40, 40, 120, 40]}
                 forceFit
               >

                 <Axis name="w_name" />
                 <Axis name="waits" />
                 <Tooltip
                   showTitle={false}
                   itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>Ср. вр. ож: {value} мин.</li>"
                 />
                 <Legend onClick={this.clickChild}/>
                 <Geom type="interval" value="f_id" position="w_name*waits" color="w_name" />
               </Chart>
             :
             this.props.match.params.type ==='serv' ?
               <Chart
                 height={400}
                 data={this.state.data}
                 scale={cols}
                 padding={[40, 40, 120, 40]}
                 forceFit
               >

                 <Axis name="w_name" />
                 <Axis name="serv" />
                 <Tooltip
                   showTitle={false}
                   itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>Ср. вр. об: {value} мин.</li>"
                 />
                 <Legend onClick={this.clickChild}/>
                 <Geom type="interval" value="f_id" position="w_name*serv" color="w_name" />
               </Chart>
             :
                <Chart
                  height={400}
                  data={this.state.data}
                  scale={cols}
                  padding={[40, 40, 120, 40]}
                  forceFit
                >

                  <Axis name="w_name" />
                  <Axis name="count" />
                  <Tooltip
                    showTitle={false}
                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>Количество: {value}</li>"
                  />
                  <Legend onClick={this.clickChild}/>
                  <Geom type="interval" value="f_id" position="w_name*count" color="w_name" />
                </Chart>
            :
              <h4>Нету билетов</h4>
          }

        </CardBody>
      </Card>

    )
  }
}

export default Child;
