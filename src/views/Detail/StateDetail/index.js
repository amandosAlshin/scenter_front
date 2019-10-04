import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  Guide
} from "bizcharts";
import { stateGroup } from './stateGroup'
var _ = require('lodash');
class StateDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      header: false
    }
    this.dataCreate = this.dataCreate.bind(this)
  }
  stateList(tickets,branch){
      var br_g=stateGroup(tickets[0].tickets,branch);
      return br_g;

  }
  dataCreate(type,value,data,history){
    switch(type){
      case 'time':
        this.setState({
          header: "Количество билетов за '" + decodeURI(value) +"'"
        })
        var data_filter = _.filter(data.time_group, function(o) {return o.time === value});
        if(data_filter.length>0){
          var tickets = this.stateList(
            data_filter,
            0
          );
          this.setState({data: tickets});
        }
      break;
      default:
        break;
    }
  }

  componentWillMount(){
    if(this.props.match.params.type && this.props.time_group){
      this.dataCreate(
        this.props.match.params.type,
        this.props.match.params.data,
        {time_group: this.props.time_group},
        this.props.history
      )
    }
  }
  componentWillReceiveProps(props){
    if(props.match.params.type && props.time_group && props.queues){
      this.dataCreate(
        props.match.params.type,
        props.match.params.data,
        {time_group: props.time_group},
        props.history
      )
    }
  }
  render() {
    const { Text } = Guide;
    const cols = {
      count: {
        formatter: val => {
          return val;
        }
      }
    };
    return (
      <Card>
        <CardHeader>
          {this.state.header}
        </CardHeader>
        <CardBody>
          <div className="chart-wrapper">
            {
              this.state.data.length>0 ?
              <Chart
                  data={this.state.data}
                  scale={cols}
                  padding="auto"
                  height={500}
                  forceFit={true}
                  animate={false}
                >
                  <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                  <Axis name="count" />
                  <Legend
                    position="bottom"
                  />
                  <Tooltip
                    showTitle={false}
                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                  />
                  <Guide>
                    <Text
                        position={["50%", "50%"]}
                        content={this.state.data ? _.sumBy(this.state.data,'count') : false}
                        style={{
                          lineHeight: "240px",
                          fontSize: "48",
                          fill: "#262626",
                          color: "#8c8c8c",
                          textAlign: "center",
                          width: "10em"
                        }}
                        alignX="middle"
                        alignY="middle"
                      />
                  </Guide>
                  <Geom
                    type="intervalStack"
                    position="count"
                    color="namess"
                    tooltip={[
                      "namess*count",
                      (namess, count) => {
                        return {
                          name: namess,
                          value: count
                        };
                      }
                    ]}
                    style={{
                      lineWidth: 1,
                      stroke: "#fff"
                    }}
                  >
                    <Label

                      content="count"
                      formatter={(val, item) => {
                        return item.point.namess + ": " + val;
                      }}
                    />
                  </Geom>
                </Chart>
              :
               false
            }

          </div>
        </CardBody>
      </Card>
    )
  }
}

export default StateDetail;
