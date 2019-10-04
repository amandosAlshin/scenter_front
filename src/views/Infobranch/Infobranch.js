import React, { Component } from 'react';
import { Card, CardBody,  CardHeader } from 'reactstrap';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend
} from "bizcharts";
import DataSet from "@antv/data-set";
var _ = require('lodash');
class Infobranch extends Component {
  constructor(props){
    super(props)
    this.chartData = this.chartData.bind(this);
    this.clickQueue = this.clickQueue.bind(this);
    this.clickBranch = this.clickBranch.bind(this);
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
  clickBranch(e){
    var filial_id = _.filter(this.props.branch_group, function(o) {return o.f_name === e});
    this.props.history.push(`/detail/branch-child/${filial_id[0].f_id}/infobranch/branch`);
  }
  clickQueue(e){
    if(e.item.dataValue === 'Ожидающие больше норматива'){
      this.props.history.push(`/detail/branch/branch/waitover`);
    }else{
      this.props.history.push(`/detail/branch/branch/${e.item.dataValue}`);
    }
  }
  componentWillMount(){
    if(this.props.filter && this.props.filter_branch){
      this.props.history.push(`/detail/branch-child/${this.props.filter_filial}/infobranch/branch`);
    }
  }
  componentWillReceiveProps(props){
    if(props.filter && props.filter_branch){
      this.props.history.push(`/detail/branch-child/${props.filter_filial}/infobranch/branch`);
    }
  }
  componentDidUpdate(prevProps, prevState){
    console.log(
      this.props.filter,
      this.props.filter_branch
    );
    if(this.props.filter && this.props.filter_branch && (prevProps.filter_filial !== this.props.filter_filial || prevProps.filter_branch !== this.props.filter_branch)){
        this.props.history.push(`/detail/branch-child/${this.props.filter_filial}/infobranch/branch`);
    }
  }
  render() {
    return (
      <div className="animated fadeIn">
      {
        this.props.branch_group ?
          <Card>
            <CardHeader>
              Показатели по ожиданию и обслуживанию клиентов
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
              <Chart
                height={400}
                data={this.chartData(this.props.branch_group)}
                forceFit
                onAxisLabelClick={(e)=>{this.clickBranch(e.target._attrs.text);}}
              >
                  <Axis name="f_name" />
                  <Axis name="value" />
                  <Legend onClick={this.clickQueue}/>
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
              </div>
            </CardBody>
          </Card>
        :
          false
      }

      </div>
    );
  }
}

export default Infobranch;
