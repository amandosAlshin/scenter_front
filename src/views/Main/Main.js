import React, { Component } from 'react';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
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
import ReactResizeDetector from 'react-resize-detector';
import DataSet from "@antv/data-set";
var _ = require('lodash');
class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      mounted: false
    }
    this.onResize= this.onResize.bind(this)
  }
  onResize(){
    this.setState({
      mounted: false
    })
    this.setState({
      mounted: true
    })
  }
  render() {
    const { DataView } = DataSet;
    const { Text } = Guide;
    const state_group = new DataView();
    const queue_group = new DataView();
    const overWaits_group = new DataView();
    const waits_group = new DataView();
    const serv_group = new DataView();
    const timeConvert = (minute)=>{
      var num = minute;
      var hours = (num / 60);
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      if(rhours === 0){
        return "" + rminutes + " мин.";
      }else{
        return "" + rhours + " ч. " + rminutes + " мин.";
      }
    }
    if(this.props.state_group){
      state_group.source(this.props.state_group).transform({
        type: "count",
        field: "count",
        dimension: "namess",
        as: "count"
      });
    }
    if(this.props.queue_group){
      queue_group.source(this.props.queue_group).transform({
        type: "count",
        field: "count",
        dimension: "w_name",
        as: "count"
      });
    }
    if(this.props.overWaits_group){
      overWaits_group.source(this.props.overWaits_group).transform({
        type: "count",
        field: "count",
        dimension: "w_name",
        as: "count"
      });
    }
    if(this.props.waits_group){
      waits_group.source(this.props.waits_group).transform({
        type: "waits",
        field: "waits",
        dimension: "w_name",
        as: "waits"
      });
    }
    if(this.props.serv_group){
      serv_group.source(this.props.serv_group).transform({
        type: "serv",
        field: "serv",
        dimension: "w_name",
        as: "serv"
      });
    }
    const cols = {
      count: {
        formatter: val => {
          return val;
        }
      }
    };
    return (
      <div>
        <ReactResizeDetector refreshRate={3000} handleWidth handleHeight onResize={this.onResize} />
        <div className="animated fadeIn">
          <CardColumns className="cols-2">
            <Card>
              <CardHeader>
                Общие показатели по электронной очереди
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                {
                  this.state.mounted && (
                    <Chart
                        data={state_group}
                        scale={cols}
                        padding="auto"
                        height={500}
                        forceFit={true}
                        animate={false}
                        onLegendItemClick={(e)=>{this.props.history.push('/detail/branch/state/'+e.data.value)}}
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
                              content={this.props.state_group ? _.sumBy(this.props.state_group,'count') : false}
                              style={{
                                lineHeight: "240px",
                                fontSize: "32",
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
                  )
                }
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                Количество клиентов ожидавщих больше норматива времени в разрезе продуктов
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                {
                  this.state.mounted && (
                    <Chart
                        data={overWaits_group}
                        scale={cols}
                        padding="auto"
                        height={500}
                        forceFit
                        animate={false}
                        onLegendItemClick={(e)=>{this.props.history.push('/detail/queue-child/0/waitover/'+e.data.value)}}
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
                            content={this.props.overWaits_group.length>0 ? _.sumBy(this.props.overWaits_group,'count') : false}
                            style={{
                              lineHeight: "240px",
                              fontSize: "32",
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
                        color="w_name"
                        tooltip={[
                          "w_name*count",
                          (w_name, count) => {
                            return {
                              name: w_name,
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
                            return item.point.w_name + ": " + val;
                          }}
                        />
                      </Geom>
                      </Chart>
                  )
                }
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                Среднее время обслуживания в разрезе продуктов
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  {
                    this.state.mounted && (
                      <Chart
                          data={serv_group}
                          scale={cols}
                          padding="auto"
                          height={500}
                          forceFit
                          animate={false}
                          onLegendItemClick={(e)=>{this.props.history.push(`/detail/queue-child/0/serv/${e.data.value}`)}}
                        >
                        <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                        <Legend
                          position="bottom"
                        />
                        <Axis name="count" />
                        <Tooltip
                          showTitle={false}
                          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value} </li>"
                        />
                        <Guide>
                          <Text
                              position={["50%", "50%"]}
                              content={this.props.serv_group.length>0 ? timeConvert((_.sumBy(this.props.serv_group,'serv')/this.props.serv_group.length).toFixed(2)): false}
                              style={{
                                lineHeight: "240px",
                                fontSize: "32",
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
                          color="w_name"
                          tooltip={[
                            "w_name*servConvert",
                            (w_name, servConvert) => {
                              return {
                                name: w_name,
                                value: servConvert
                              };
                            }
                          ]}
                          style={{
                            lineWidth: 1,
                            stroke: "#fff"
                          }}
                        >
                          <Label
                            content="servConvert"
                            formatter={(val, item) => {
                              return item.point.w_name + ": " + val + "";
                            }}
                          />
                        </Geom>
                      </Chart>
                    )
                  }

                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                Количество клиентов в разрезе продуктов
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  {
                    this.state.mounted && (
                      <Chart
                          data={queue_group}
                          scale={cols}
                          padding="auto"
                          height={500}
                          forceFit
                          animate={false}
                          onLegendItemClick={(e)=>{this.props.history.push('/detail/queue-child/0/queue/'+e.data.value)}}
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
                                content={this.props.queue_group.length>0 ?  _.sumBy(this.props.queue_group,'count') : false}
                                style={{
                                  lineHeight: "240px",
                                  fontSize: "32",
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
                            color="w_name"
                            tooltip={[
                              "w_name*count",
                              (w_name, count) => {
                                return {
                                  name: w_name,
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
                                return item.point.w_name + ": " + val;
                              }}
                            />
                          </Geom>
                        </Chart>
                    )
                  }

                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                Среднее время ожидания в разрезе продуктов
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                {
                  this.state.mounted && (
                    <Chart
                        data={waits_group}
                        scale={cols}
                        padding="auto"
                        height={500}
                        forceFit
                        animate={false}
                        onLegendItemClick={(e)=>{this.props.history.push('/detail/queue-child/0/waits/'+e.data.value)}}
                      >
                      <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                      <Axis name="count" />
                      <Legend
                        position="bottom"
                      />
                      <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value} </li>"
                      />
                      <Guide>
                        <Text
                            position={["50%", "50%"]}
                            content={this.props.waits_group.length>0 ? timeConvert((_.sumBy(this.props.waits_group,'waits')/this.props.waits_group.length).toFixed(2)) : false}
                            style={{
                              lineHeight: "240px",
                              fontSize: "32",
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
                        color="w_name"
                        tooltip={[
                          "w_name*waitsConvert",
                          (w_name, waitsConvert) => {
                            return {
                              name: w_name,
                              value: waitsConvert
                            };
                          }
                        ]}
                        style={{
                          lineWidth: 1,
                          stroke: "#fff"
                        }}
                      >
                        <Label
                          content="waitsConvert"
                          formatter={(val, item) => {
                            return item.point.w_name + ": " + val + "";
                          }}
                        />
                      </Geom>
                    </Chart>
                  )
                }
                </div>
              </CardBody>
            </Card>
          </CardColumns>
        </div>
      </div>
    );
  }
}

export default Main;
