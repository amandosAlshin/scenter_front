import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import CheckboxTree from 'react-checkbox-tree';
var _ = require('lodash');
class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      checked: [],
      expanded: []
    }
    this.branchlist = this.branchlist.bind(this);
  }
  groupBy(dataToGroupOn, fieldNameToGroupOn, fieldNameForGroupName, fieldNameForChildren){
      var result = _.chain(dataToGroupOn)
          .groupBy(fieldNameToGroupOn)
          .toPairs()
          .map(function (currentItem) {
              return _.zipObject([fieldNameForGroupName, fieldNameForChildren], currentItem);
          })
          .value();
      return result;
  }
  buildTree(flatList, idFieldName, parentKeyFieldName, fieldNameForChildren) {
      var rootElements = [];
      var lookup = {};
      flatList.forEach(function (flatItem) {
        var itemId = flatItem[idFieldName];
        lookup[itemId] = flatItem;
        flatItem[fieldNameForChildren] = [];
      });
      flatList.forEach(function (flatItem) {
        var parentKey = flatItem[parentKeyFieldName];
        if (parentKey != null) {
          var parentObject = lookup[flatItem[parentKeyFieldName]];
          if(parentObject){
            flatItem['value'] = flatItem['F_ID'];
            flatItem['label'] = flatItem['F_NAME'];
            parentObject[fieldNameForChildren].push(flatItem);
          }else{
            flatItem['value'] = flatItem['F_ID'];
            flatItem['label'] = flatItem['F_NAME'];
            rootElements.push(flatItem);
          }
        } else {
          flatItem['value'] = flatItem['F_ID'];
          flatItem['label'] = flatItem['F_NAME'];
          rootElements.push(flatItem);
        }
      });
      return rootElements;
  }
  branchFilter(data,idbranch){
    return _.filter(data, function(o) {return parseInt(o.F_ID,10) === idbranch});
  }
  parentbranch(data,parentid){
    return _.filter(data, function(a){return parseInt(a.F_ID,10) === parentid});
  }
  branchlist(){
      var branchesID = this.props.user_success.data[0].id_branch.split(",");
      var arr=[];
      for(var i=0; i<=branchesID.length-1; i++){
          var temp = this.branchFilter(this.props.branch_success.data,parseInt(branchesID[i],10));
          if(temp.length > 0){
              arr.push({
                  "F_ID": temp[0].F_ID,
                  "F_NAME": temp[0].F_NAME,
                  "F_PARENT_ID": temp[0].F_PARENT_ID
              });
         }
      }
      var child_arr = this.groupBy(arr, 'F_PARENT_ID', 'F_PARENT_ID', 'child');
      for(var s=0; s<=child_arr.length-1; s++){
        var parent = this.parentbranch(this.props.branch_success.data,parseInt(child_arr[s].F_PARENT_ID,10));
        if(parent.length > 0){
          arr.push({
              "F_ID": parent[0].F_ID,
              "F_NAME": parent[0].F_NAME,
              "F_PARENT_ID": parent[0].F_PARENT_ID
          });
        }
      }

    var tree = this.buildTree(arr,'F_ID','F_PARENT_ID','children');
    return(
       <CheckboxTree
            nodes={tree}
            checked={this.state.checked}
            expanded={this.state.expanded}
            onCheck={checked => this.setState({ checked })}
            onExpand={expanded => this.setState({ expanded })}
            icons={{
              check: <span className="fa chevron-down" />,
              uncheck: <span className="fa chevron-down" />,
              halfCheck: <span className="fa chevron-down" />,
              expandClose: <span className="icon-arrow-right" />,
              expandOpen: <span className="icon-arrow-down" />,
              expandAll: <span className="fa chevron-down fa-lg mt-4" />,
              collapseAll: <span className="fa chevron-down fa-lg mt-4" />,
              parentClose: <span className="fa times-circle fa-lg mt-4" />,
              parentOpen: <span className="fa chevron-right fa-lg mt-4" />,
              leaf: <span className="rct-icon rct-icon-leaf" />,
          }}
        />
    )
  }
  componentWillMount(){
    this.props.usersInfo(this.props.match.params.id);
  }
  render(){
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Пользователь:</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                      {
                        this.props.user_success.status ?
                          <tbody>
                            <tr>
                              <td>Логин</td>
                              <td><strong>{this.props.user_success.data[0].login}</strong></td>
                            </tr>
                            <tr>
                              <td>Пароль</td>
                              <td><strong>{this.props.user_success.data[0].password}</strong></td>
                            </tr>
                            <tr>
                              <td>Роль</td>
                              <td><strong>{this.props.user_success.data[0].role === 0 ? 'Администратор'
                                  : this.props.user_success.data[0].role === 1 ? 'Директор'
                                  : this.props.user_success.data[0].role === 2 ? 'Директор филиала'
                                  : this.props.user_success.data[0].role === 3 ? 'Нач. отделение'
                                  : false}</strong></td>
                            </tr>
                            <tr>
                              <td>Дата регистраций</td>
                              <td><strong>{this.props.user_success.data[0].ins_date}</strong></td>
                            </tr>
                          </tbody>
                        :
                          false
                      }
                  </Table>
                  <h4>Отделений</h4>
                  {this.props.user_success.status ? this.props.user_success.data[0].role === 0 ? 'Все отделений' : this.branchlist() : false}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
