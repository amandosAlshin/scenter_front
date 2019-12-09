import React, { Component } from 'react';
import {Card,CardBody,FormGroup,Label,Input,Col,Button} from 'reactstrap';
import PropTypes from 'prop-types';
var _ = require('lodash');
const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultAside extends Component {
  constructor(props){
    super(props)
    this.state = {
      branch_list: [],
      filial: false,
      branch: false
    }
    this.changeFilial = this.changeFilial.bind(this)
    this.changeBranch = this.changeBranch.bind(this)
    this.filterSubmit = this.filterSubmit.bind(this)
    this.filterReset = this.filterReset.bind(this)
    this.ItemSlaid = this.ItemSlaid.bind(this)
  }
  ItemSlaid(id){
     let slaids = this.props.state_slaid.state_slaid;
     slaids[id] = !slaids[id];
     this.props.changeSlaids(slaids);
   }
   changeColumn(count){
     this.props.changeCount(count);
   }
  filterReset(){
    this.props.branchFilter(false,false);
    if(this.props.branches.length===1){
      this.setState({filial:false,branch: false,branch_list: this.props.branches[0].children})
    }else{
      this.setState({filial:false,branch: false,branch_list: []})
    }
  }
  filterSubmit(){
    if(this.state.filial){
      if(this.state.branch_list.length===1){
          this.props.branchFilter(this.state.branch_list,this.state.branch_list[0].F_ID);
      }else{
          this.props.branchFilter(this.state.branch_list,this.state.branch);
      }

    }else{
      this.props.branchFilter(false,this.state.branch);
    }
  }
  componentWillReceiveProps(props){
    if(props.branches && props.branches.length === 1){
        this.setState({
          branch_list: props.branches[0].children
        })
    }

  }
  branchList(data){
    if(data.length===1){
      return(
        <Input disabled type="select" onChange={this.changeBranch} name="select" id="select">
          <option  value={data[0].F_ID}>{data[0].F_NAME}</option>
        </Input>
      )
    }else{
      return (
        <Input value={this.state.branch ? this.state.branch : 0} type="select" onChange={this.changeBranch} name="select" id="select">
          <option value={0}>Выберите отделение</option>
          {
            data.map(function(item,index){
              return <option key={index} value={item.F_ID}>{item.F_NAME}</option>
            })
          }
        </Input>
      )
    }
  }
  filialList(data){
    if(data.length===1){
      return(
        <Input disabled type="select" onChange={this.changeFilial} name="selectFilial" id="selectFilial">
          <option  value={data[0].F_ID}>{data[0].F_NAME}</option>
        </Input>
      )
    }else{
      return (
        <Input value={this.state.filial ? this.state.filial : 0} type="select" onChange={this.changeFilial} name="selectFilial" id="selectFilial">
          <option value={0}>Выберите филиал</option>
          {
            data.map(function(item,index){
              return <option key={index} value={item.F_ID}>{item.F_NAME}</option>
            })
          }
        </Input>
      )
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
      this.filterReset()
    }
  }
  changeBranch(e){
    if(parseInt(e.target.value,10) > 0){
      this.setState({
        branch: e.target.value
      })
    }else{
      this.setState({
        filial: false
      })
    }
  }
  render() {
    const {state_slaid} = this.props.state_slaid;
    return (
      <React.Fragment>
        <Card style={{border: 'none'}}>
          <CardBody>
            <h6>Фильтрация</h6>
            <FormGroup row>
              <Col md="12">
                <Label htmlFor="selectFilial">Филиал</Label>
              </Col>
              <Col xs="12" md="12">
                {
                  this.props.branches ?
                    this.filialList(this.props.branches)
                  :
                    false
                }
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="12">
                <Label htmlFor="select">Отделение</Label>
              </Col>
              <Col xs="12" md="12">
                {
                  this.state.branch_list ?
                        this.state.branch_list.length > 0 ?
                          this.branchList(this.state.branch_list)
                        :
                          <Input type="select" name="disabledSelect" id="disabledSelect" disabled autoComplete="name">
                            <option value="0">Выберите отделение</option>
                          </Input>

                  :
                    false

                }
              </Col>
            </FormGroup>
            {
              this.props.branches ?
                <div>
                  <Button
                  onClick={this.filterSubmit}
                  disabled={
                    (this.props.branches.length===1 && this.state.branch_list.length===1)
                     ||
                    (!this.state.filial && !this.state.branch) ? true : false}
                    type="submit"
                    size="sm"
                    color="primary"
                  >
                  <i className="fa fa-dot-circle-o"></i>Применить</Button>
                  <Button
                    onClick={this.filterReset}
                    disabled={
                      (this.props.branches.length===1 && this.state.branch_list.length===1)
                      ||
                      (!this.state.filial && !this.state.branch) ? true : false}
                      type="reset"
                      size="sm"
                      color="danger"
                    >
                    <i className="fa fa-ban"></i> Сбросить</Button>
                </div>
              :
                false
            }
            <br />
           <h6>Статистика</h6>
           <FormGroup row>
             <Col md="9">
               <form >
                 <FormGroup check className="radio">
                   <Input checked={state_slaid[0]} onChange={()=>this.ItemSlaid(0)} className="form-check-input" type="checkbox" id="radio1" name="radios" value="option1" />
                   <Label check className="form-check-label" htmlFor="radio1">График 1</Label>
                 </FormGroup>
                 <FormGroup check className="radio">
                   <Input checked={state_slaid[1]} onChange={()=>this.ItemSlaid(1)} className="form-check-input" type="checkbox" id="radio2" name="radios" value="option2" />
                   <Label check className="form-check-label" htmlFor="radio2">График 2</Label>
                 </FormGroup>
                 <FormGroup check className="radio">
                   <Input checked={state_slaid[2]} onChange={()=>this.ItemSlaid(2)} className="form-check-input" type="checkbox" id="radio3" name="radios" value="option3" />
                   <Label check className="form-check-label" htmlFor="radio3">График 3</Label>
                 </FormGroup>
                 <FormGroup check className="radio">
                   <Input checked={state_slaid[3]} onChange={()=>this.ItemSlaid(3)} className="form-check-input" type="checkbox" id="radio3" name="radios" value="option4" />
                   <Label check className="form-check-label" htmlFor="radio3">График 4</Label>
                 </FormGroup>
                 <FormGroup check className="radio">
                   <Input checked={state_slaid[4]} onChange={()=>this.ItemSlaid(4)} className="form-check-input" type="checkbox" id="radio3" name="radios" value="option5" />
                   <Label check className="form-check-label" htmlFor="radio3">График 5</Label>
                 </FormGroup>
               </form>
             </Col>
           </FormGroup>
           <h6>Колонки</h6>
           <FormGroup row>
             <Col md="9">
               <form >
                 <FormGroup check className="radio">
                   <Input checked={this.props.column_count === 1 ? true : false} onChange={()=>this.changeColumn(1)} className="form-check-input" type="radio" id="radio1" name="radios" value="option1" />
                   <Label check className="form-check-label" htmlFor="radio1">1</Label>
                 </FormGroup>
                 <FormGroup check className="radio">
                   <Input checked={this.props.column_count === 2 ? true : false} onChange={()=>this.changeColumn(2)} className="form-check-input" type="radio" id="radio2" name="radios" value="option2" />
                   <Label check className="form-check-label" htmlFor="radio2">2</Label>
                 </FormGroup>
               </form>
             </Col>
           </FormGroup>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
