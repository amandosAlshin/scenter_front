import React, { Component } from 'react';
import { Card,
  CardBody,
  FormGroup,
  Label,
  Badge,
  CardHeader,
  Input
} from 'reactstrap';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord
} from "bizcharts";
import DataSet from "@antv/data-set";
import { statusBranch } from './statusBranch'
var _ = require('lodash');
class Employee extends Component {
  constructor(props){
    super(props)
    this.state = {
      filial: false,
      branch: false,
      general_filter_filial: [],
      openModal: false,
      branch_list: []
    }
    this.changeFilial = this.changeFilial.bind(this);
    this.employeeList = this.employeeList.bind(this);
    this.chartData = this.chartData.bind(this);
    this.changeBranch = this.changeBranch.bind(this);
    this.clickEmployee = this.clickEmployee.bind(this)
    //this.employeeModal = this.employeeModal.bind(this)
  }
  componentWillMount(){
    if(this.props.branches){
      var branchesFilter = statusBranch(this.props.branches,this.props.filter,this.props.filter_filial,this.props.filter_branch);
      if(branchesFilter.general_filter_filial && branchesFilter.branch_list){
        this.setState({
          general_filter_filial: branchesFilter.general_filter_filial.length ? branchesFilter.general_filter_filial: [],
          branch_list: branchesFilter.branch_list.length ? branchesFilter.branch_list : []
        })
      }

    }
  }
  componentWillReceiveProps(props){
    if(props.branches){
      var branchesFilter = statusBranch(props.branches,props.filter,props.filter_filial,props.filter_branch);
      if(branchesFilter.general_filter_filial && branchesFilter.branch_list){
        this.setState({
          general_filter_filial: branchesFilter.general_filter_filial.length ? branchesFilter.general_filter_filial: [],
          branch_list: branchesFilter.branch_list.length ? branchesFilter.branch_list : []
        })
      }
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.branches){
      var branchesFilter = statusBranch(this.props.branches,this.props.filter,this.props.filter_filial,this.props.filter_branch);
      if(branchesFilter.general_filter_filial && branchesFilter.branch_list && (prevProps.filter_filial !== this.props.filter_filial || prevProps.filter_branch !== this.props.filter_branch)){
        this.setState({
          general_filter_filial: branchesFilter.general_filter_filial.length ? branchesFilter.general_filter_filial: [],
          branch_list: branchesFilter.branch_list.length ? branchesFilter.branch_list : []
        })
      }

    }
  }
  changeFilial(e){
    if(parseInt(e.target.value,10)>0){
      var filial = _.filter(this.props.branches, function(o) {return parseInt(o.F_ID,10)===parseInt(e.target.value,10)});
      this.setState({
        filial: e.target.value,
        branch_list: filial[0].children
      })
    }else{
      this.setState({
        filial: false,
        branch_list: []
      })
    }
  }
  changeBranch(e){
    if(parseInt(e.target.value,10) > 0){
      this.setState({
        branch: e.target.value
      })
    }else{
      this.setState({
        branch: false
      })
    }
  }
  chartData(data){
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
        type: "sort",
        callback(a, b) {
          return a.count - b.count > 0;
        }
    });
    return dv;
  }
  clickEmployee(employee,e){
    var idemployee = _.filter(employee, function(o) {return o.employee === e});
    if(idemployee.length>0){
      this.props.history.push(`/detail/queue-parent/0/employee/${idemployee[0].F_ID}`);
    }
  }
  employeeList(data){
    const list = (branch)=>{
      var filter_employee = [];
      for(var i=0;i<=data.length-1;i++){
        let empl_g=[];
        for(var em=0; em<=data[i].employee.length-1;em++){
          if(parseInt(branch,10)===parseInt(data[i].employee[em].F_BRANCH_ID,10)){
            empl_g.push(data[i].employee[em]);
          }
        }
        console.log('empl_g',empl_g);
        if(empl_g.length>0){
          filter_employee.push({
            F_DESCR: data[i].F_DESCR,
            employee: empl_g
          })
        }
      }
      console.log('data[i].employee',data);
      if(filter_employee.length>0){
        return(
          <div>
            {
              filter_employee.map(function(item,index){
                var height = item.employee.length*30;
                return(
                  <Card key={index}>
                    <CardHeader>
                      {item.F_DESCR==='null' ? 'Не указан' : item.F_DESCR} - время авторизации
                      <div className="card-header-actions">
                        <h4><Badge className="mr-1" color="primary">{item.employee.length}  сотрудников</Badge></h4>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-wrapper">
                        <Chart
                          onAxisLabelClick={(e)=>{this.clickEmployee(item.employee,e.target._attrs.text);}}
                          scale={scale}
                          data={this.chartData(item.employee)}
                          padding={[20, 20, 40, 210]}
                          forceFit={true}
                          height={height}
                        >
                          <Axis position='top' name="count" />
                          <Coord transpose />
                          <Axis
                          subTickCount={8}
                            name="employee"
                            label={{
                              offset: 12,
                              textStyle: {
                                cursor: 'pointer',
                                fill: '#404040', // 文本的颜色
                                fontSize: '12', // 文本大小
                                fontWeight: 'bold', // 文本粗细
                                textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
                              }
                            }}
                          />
                          <Tooltip
                            itemTpl="<li>Количество: {value}</li>"
                          />
                          <Geom type="interval" position="employee*count" color="employee"/>
                        </Chart>
                      </div>
                    </CardBody>
                  </Card>
                )
              },this)
            }
          </div>
        )
      }else{
        return (
          <h3>В данном отделение нет операторов</h3>
        );
      }
    }
    const scale = {
        sales: {
        min: 0,
         max: 10,
         ticks: [100, 1000, 2000, 3000],
         tickInterval: 1000,
         tickCount: 10
        }
    };
    if(this.state.branch_list.length===1){
      return list(this.state.branch_list[0].F_ID);
    }else if (this.state.branch) {
      return list(this.state.branch)
    }else{
      return false;
    }
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Card className="mx-12">
          <CardBody className="p-4">
            <h4>Выберите отделение</h4>
            <FormGroup className="pr-1">
              <Label htmlFor="selectFilial" className="pr-1">Филилал</Label>
              {
                this.props.branches && this.state.general_filter_filial.length>0 ?
                  this.state.general_filter_filial.length===1 ?
                    <Input disabled type="select" onChange={this.changeFilial} name="selectFilial" id="selectFilial">
                      <option  value={this.state.general_filter_filial[0].F_ID}>{this.state.general_filter_filial[0].F_NAME}</option>
                    </Input>
                  :
                    <Input value={this.state.filial ? this.state.filial : 0} type="select" onChange={this.changeFilial} name="selectFilial" id="selectFilial">
                      <option value={0}>Выберите филиал</option>
                      {
                        this.state.general_filter_filial.map(function(item,index){
                          return <option key={index} value={item.F_ID}>{item.F_NAME}</option>
                        })
                      }
                    </Input>
                :
                  false
              }
            </FormGroup>
            <FormGroup className="pr-1">
              <Label htmlFor="exampleInputEmail2" className="pr-1">Отделение</Label>
              {
                this.state.branch_list ?
                  this.state.branch_list.length === 1 ?
                    <Input disabled type="select" name="disabledSelect" id="disabledSelect"  autoComplete="name">
                      <option  value={this.state.branch_list[0].F_ID}>{this.state.branch_list[0].F_NAME}</option>
                    </Input>
                  :
                    this.state.branch_list.length === 0 ?
                      <Input disabled type="select" name="disabledSelect" id="disabledSelect"  autoComplete="name">
                        <option value="0">Выберите отделение</option>
                      </Input>
                    :
                      <Input  onChange={this.changeBranch} value={this.state.branch ? this.state.branch : false} type="select" name="disabledSelect" id="disabledSelect"  autoComplete="name">
                        <option value="0">Выберите отделение</option>
                        {
                          this.state.branch_list.map(function(item,index){
                            return <option key={index} value={item.F_ID}>{item.F_NAME}</option>
                          })
                        }
                      </Input>
                :
                  false
              }
            </FormGroup>
          </CardBody>
        </Card>
        {
          this.employeeList(this.props.employee_group)
        }
      </div>
    )
  }
}
export default Employee;
