import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from 'reactstrap';
import { Field  } from 'redux-form'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
var _ = require('lodash');
class ChangeBranch extends Component{
  constructor(props){
    super(props)
    this.state={
      access: false,
      access_modal: false,
      checked: [],
      expanded: [],
      filial: false,
      filialChange: false,
      branchList: [],
      branch: false
    }
    this.changeAccess = this.changeAccess.bind(this)
    this.filialChange = this.filialChange.bind(this)
    this.dispatchBranch = this.dispatchBranch.bind(this)
  }
  filialChange(e){
    var filial = _.filter(this.props.branches, function(o) {return parseInt(o.F_ID,10)===parseInt(e.target.value,10)});
    this.setState({
      branchList: filial[0].children
    })
  }
  changeAccess(e){
    if(parseInt(e.target.value,10) === 0){
      this.setState({access: '0'});
      this.props.changeBranch(false,0);
    }else{
      this.setState({access: e.target.value,access_modal: true})
    }
  }
  dispatchBranch(){
    if (this.state.access === '1') {
      this.props.changeBranch(this.state.checked,1);
    }else if (this.state.access === '2') {
      var filial;
      var i = 0;
      while (i<=this.props.branches.length-1) {
        if(parseInt(this.props.branches[i].F_ID,10)===parseInt(this.state.filial,10)){
          filial = this.props.branches[i];
          break;
        }
        i++;
      }
      var arr = [];
      filial.children.map(function(item){
        return arr.push(item.F_ID);
      });
      this.props.changeBranch(arr,2);
    }else if (this.state.access === '3') {

      this.props.changeBranch([this.state.branch],3);
    }else {
      this.props.changeBranch(false,false);
    }
    this.setState({access_modal: false})
  }
  render(){
    return(
      <div>
      <Modal
        isOpen={this.state.access_modal}
        className={'modal-access_modal ' + this.props.className}
      >
          <ModalHeader>
              {
                  this.state.access === '1' ?
                    'Директор'
                  :
                  this.state.access ==='2' ?
                    'Директор филиала'
                  :
                    this.state.access ==='3' ?
                      'Нач. отделение'
                    :
                      false
              }
          </ModalHeader>
          <ModalBody>
            {
              this.state.access === '1' ?
                <CheckboxTree
                    nodes={this.props.branches}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    onCheck={checked => this.setState({ checked })}
                    onExpand={expanded => this.setState({ expanded })}
                    icons={{
                      check: <span className="icon-check" />,
                      uncheck: <span className="fa fa-circle-thin" />,
                      halfCheck: <span className="icon-check" />,
                      expandClose: <span className="icon-arrow-right" />,
                      expandOpen: <span className="icon-arrow-down" />,
                      expandAll: <span className="fa chevron-down fa-lg mt-4" />,
                      collapseAll: <span className="fa chevron-down fa-lg mt-4" />,
                      parentClose: <span className="fa times-circle fa-lg mt-4" />,
                      parentOpen: <span className="fa chevron-right fa-lg mt-4" />,
                      leaf: <span className="rct-icon rct-icon-leaf" />,
                  }}
                />
              :
                this.state.access === '2' ?
                  <FormGroup  check className="radio">
                    {
                      this.props.branches.map(function(item,index){
                        return(
                          <div key={index}>
                            <Field
                              name="branch"
                              component="input"
                              type="radio"
                              value={item.F_ID}
                              checked={this.state.filial === item.F_ID}
                              onChange={(e)=>this.setState({filial: e.target.value})}
                            />{' '}
                            <Label check className="form-check-label" htmlFor="radio1">{item.F_NAME}</Label>
                          </div>
                        )
                      },this)
                    }
                  </FormGroup>
              :
                this.state.access === '3' ?
                  <div>
                    <FormGroup>
                      <Label htmlFor="ccfilial">Филиал</Label>
                      <Input onChange={this.filialChange} type="select" name="ccfilial" id="ccfilial">
                        <option value={0}>Выберите филиал</option>
                        {
                          this.props.branches.map(function(item,index){
                            return(<option key={index} value={item.F_ID}>{item.F_NAME}</option>)
                          })
                        }
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="ccbranch">Отделение</Label>
                      <Input onChange={(e)=>{e.target.value === 0 ? this.setState({branch: false}) : this.setState({branch: e.target.value})}} disabled={this.state.branchList.length===0} type="select" name="ccbranch" id="ccbranch">
                        <option value={0}>Выберите отделение</option>
                        {
                          this.state.branchList.map(function(item,index){
                            return(<option key={index} value={item.F_ID}>{item.F_NAME}</option>)
                          })
                        }
                      </Input>
                    </FormGroup>
                  </div>
              :
                false
            }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.dispatchBranch}>Продолжить</Button>{' '}
            <Button color="secondary" onClick={()=>this.setState({access_modal: false,access: false})}>Изменить роль</Button>
          </ModalFooter>
        </Modal>
        <label>Роль пользователя</label>
        <div>
          <FormGroup check inline className="radio">
            <Field
              name="role"
              component="input"
              type="radio"
              value="0"
              checked={this.state.access === '0'}
              onChange={this.changeAccess}
            />{' '}
            <Label check className="form-check-label">Администратор</Label>
          </FormGroup>
          <FormGroup check inline className="radio">
            <Field
              name="role"
              component="input"
              type="radio"
              value="1"
              checked={this.state.access === '1'}
              onChange={this.changeAccess}
            />{' '}
            <Label check className="form-check-label">Директор</Label>
          </FormGroup>
          <FormGroup check inline className="radio">
            <Field
              name="role"
              component="input"
              type="radio"
              value="2"
              checked={this.state.access === '2'}
              onChange={this.changeAccess}
            />{' '}
            <Label check className="form-check-label">Директор филиала</Label>
          </FormGroup>
          <FormGroup check inline className="radio">
            <Field
              name="role"
              component="input"
              type="radio"
              value="3"
              checked={this.state.access === '3'}
              onChange={this.changeAccess}
            />{' '}
            <Label check className="form-check-label">Нач. отделение</Label>
          </FormGroup>
        </div>
      </div>
    )
  }
}


export default ChangeBranch
