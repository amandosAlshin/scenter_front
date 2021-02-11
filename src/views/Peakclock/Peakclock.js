import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend
} from "bizcharts";
import DataSet from '@antv/data-set';
class Peakclock extends Component {
  constructor(props){
    super(props)
    this.clickTime = this.clickTime.bind(this)
  }
  chartDataQuantity(data){
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["Среднее время обслуживания", "Среднее время ожидания"],
      key: "waits",
      value: "clock"
    });
    return dv;
  }
  clickTime(e){
    if(e.item){
      this.props.history.push(`/detail/state/time/${e.item.dataValue}`);
    }
  }
  render() {
    const cols = {
       time: {
         range: [0, 1]
       }
     };
    return (
      <div className="animated fadeIn">
      {
        this.props.time_group ?
          <div>
            <Card>
              <CardHeader>
                Общее количество клиентов
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Chart
                    height={400}
                    data={this.props.time_group}
                    scale={cols}
                    forceFit
                    onClick={this.clickTime}
                  >
                     <Axis name="time"/>
                     <Axis name="value" />
                     <Tooltip
                       itemTpl="<li>Количество билетов: {value} <br /> Количество операторов: {employee_count}<br />Долгое ожидание: {waitover} <br />Долгое обслуживание: {preservover} <br />Плохие оценки: {ratingover} <br /> KPI: {kpi}%</li>"
                       crosshairs={{
                         type: "y"
                       }}
                     />
                     <Legend onClick={this.clickTime}/>
                     <Geom type="line" position="time*count*employee_count*kpi*waitover*preservover*ratingover" size={2}
                       tooltip={['count*employee_count*kpi*waitover*preservover*ratingover', (count, employee_count,kpi,waitover,preservover,ratingover) => {
                         // console.log("t "+tickets);
                          return {
                            employee_count: employee_count,
                            value: count,
                            kpi: kpi,
                            waitover: waitover,
                            preservover: preservover,
                            ratingover: ratingover,

                          };
                        }]}
                     />
                     <Geom
                       color="time"
                       type="point"
                       position="time*count"
                       size={4}
                       shape={"circle"}

                       style={{
                         stroke: "#fff",
                         lineWidth: 1
                       }}
                      />
                  </Chart>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                Среднее время обслуживания и ожидания клиентов, в мин
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Chart height={400} data={this.chartDataQuantity(this.props.time_group)} scale={cols} forceFit>
                     <Axis name="time" />
                     <Axis
                       name="clock"
                       label={{
                         formatter: val => `${val}`
                       }}
                     />
                     <Tooltip
                       crosshairs={{
                         type: "y"
                       }}
                     />
                     <Legend />
                     <Geom
                       type="line"
                       position="time*clock"
                       size={2}
                       color={"waits"}
                     />
                     <Geom
                       type="point"
                       position="time*clock"
                       size={4}
                       shape={"circle"}
                       color={"waits"}
                       style={{
                         stroke: "#fff",
                         lineWidth: 1
                       }}
                     />
                   </Chart>
                </div>
              </CardBody>
            </Card>
          </div>
        :
          false
      }

      </div>
    );
  }
}

export default Peakclock;
