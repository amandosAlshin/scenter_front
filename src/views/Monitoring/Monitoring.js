import React, { Component } from 'react';
import { Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Col,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { statusBranch } from './statusBranch'
import { groupBy,monitoringData } from './detail'
import classnames from 'classnames';
import ScenePicture from './ScenePicture';
var _ = require('lodash');
class Monitoring extends Component {
  constructor(props){
    super(props)
    this.state = {
      filial: false,
      branch: false,
      branch_list: [],
      activeTab: '1',
    }
    this.changeFilial = this.changeFilial.bind(this);
    this.changeBranch = this.changeBranch.bind(this);
    this.toggle = this.toggle.bind(this);
    this.windowsList = this.windowsList.bind(this);
    this.cameraListEvent = this.cameraListEvent.bind(this);
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

    if(props.branches && this.state.branch_list.length===0){
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
      if((branchesFilter.general_filter_filial && branchesFilter.branch_list) && (prevProps.filter_filial !== this.props.filter_filial || prevProps.filter_branch !== this.props.filter_branch)){
        this.setState({
          general_filter_filial: branchesFilter.general_filter_filial.length ? branchesFilter.general_filter_filial : [],
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
  waitingList(data){
    const list = (branch)=>{
      var count = 0;
      var new_tickets =  _.filter(data, function(o) {return o.state==='NEW'});
      if(new_tickets.length>0){
          var filter_tickets = groupBy(new_tickets[0].tickets, 'idbranch', 'idbranch', 'tickets');
          var branch_tickets = _.filter(filter_tickets, function(o) {return parseInt(o.idbranch,10)===parseInt(branch,10)});
          if(branch_tickets.length>0){
            count = branch_tickets[0].tickets.length;
          }else{
            count = 0;
          }
      }
      return(
        <Col xs="12" sm="6" lg="4">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <div className="text-value">{count}</div>
              <div>Ожидающие Клиенты</div>
            </CardBody>
          </Card>
        </Col>
      )
    }
    if(this.state.branch_list.length===1){
      return list(this.state.branch_list[0].F_ID);
    }else if (this.state.branch) {
      return list(this.state.branch)
    }else{
      return false;
    }
  }
  windowsList(newtickets,inservice,window_group,role,waits_group,serv_group){
    if(this.state.branch_list.length===1){
      return monitoringData(this.state.branch_list[0].F_ID,newtickets,inservice,window_group,role,waits_group,serv_group);
    }else if (this.state.branch) {
      return monitoringData(this.state.branch,newtickets,inservice,window_group,role,waits_group,serv_group);
    }else{
      return false;
    }
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(() => {
      if(this.state.branch_list.length>0){
        this.props.ticketList(this.props.history,{data: this.props.tickets});
        this.props.windowState({data: this.props.windows});
      }

    }, 30000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  cameraListEvent(){
    this.props.cameraList(4992005);
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
          this.state.branch_list.length===1 || this.state.branch ?
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    Мониторинг
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Ожидающие
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}
                  >
                    Обслуживающие
                  </NavLink>
                </NavItem>

              </Nav>
              <ScenePicture cameraSucces={this.props.camera_list_success} activeTab={this.state.activeTab} data={
                  this.windowsList(
                    this.props.waits_ticket,
                    this.props.serv_ticket,
                    this.props.window_group,
                    this.props.role_group,
                    this.props.waits_group_branch,
                    this.props.serv_group_branch
                  )
                }
              />
            </div>
          :
          false
        }
      </div>
    );
  }
}

export default Monitoring;
