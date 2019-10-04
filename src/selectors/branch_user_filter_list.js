import { createSelector } from 'reselect'
const userStatus = (state) => state.user_check.success.status;
const user = (state) => state.user_check.success.data;
const branchsStatus = (state) => state.branch_list.success.status;
const branchs = (state) => state.branch_list.success.data;
var _ = require('lodash');
function groupBy(dataToGroupOn, fieldNameToGroupOn, fieldNameForGroupName, fieldNameForChildren){
    var result = _.chain(dataToGroupOn)
        .groupBy(fieldNameToGroupOn)
        .toPairs()
        .map(function (currentItem) {
            return _.zipObject([fieldNameForGroupName, fieldNameForChildren], currentItem);
        })
        .value();
    return result;
}
function buildTree(flatList, idFieldName, parentKeyFieldName, fieldNameForChildren){
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
          flatItem['key'] = flatItem['F_ID'];
          flatItem['title'] = flatItem['F_NAME'];
          parentObject[fieldNameForChildren].push(flatItem);
        }else{
          flatItem['value'] = flatItem['F_ID'];
          flatItem['label'] = flatItem['F_NAME'];
          flatItem['key'] = flatItem['F_ID'];
          flatItem['title'] = flatItem['F_NAME'];
          rootElements.push(flatItem);
        }
      } else {
        flatItem['value'] = flatItem['F_ID'];
        flatItem['label'] = flatItem['F_NAME'];
        flatItem['key'] = flatItem['F_ID'];
        flatItem['title'] = flatItem['F_NAME'];
        rootElements.push(flatItem);
      }

    });
    return rootElements;
}
function branchFilter(data,idbranch){
  return _.filter(data, function(o) {return parseInt(o.F_ID,10) === idbranch});
}
function parentbranch(data,parentid){
  return _.filter(data, function(a){return parseInt(a.F_ID,10) === parentid});
}
export const branchUserFilter = createSelector(
  [ userStatus, user,branchsStatus,branchs],
  (userStatus,user,branchsStatus,branchs) => {
    if(branchsStatus && userStatus){
      var tree=[]
      if(parseInt(user[0].role,10) === 0){
        tree = buildTree(branchs,'F_ID','F_PARENT_ID','children');
        if(tree.length===1){
          var filial = _.filter(tree[0].children, function(o) {return o.children.length>0});
          return filial;
        }else if (tree.length>1) {
          return tree;
        }else{
          return false;
        }
      }else{
        var branchesID = user[0].id_branch.split(",");
        var arr=[];
        for(var i=0; i<=branchesID.length-1; i++){
            var temp = branchFilter(branchs,parseInt(branchesID[i],10));
            if(temp.length > 0){
                arr.push({
                    "F_ID": temp[0].F_ID,
                    "F_NAME": temp[0].F_NAME,
                    "F_PARENT_ID": temp[0].F_PARENT_ID
                });
           }
        }
        var child_arr = groupBy(arr, 'F_PARENT_ID', 'F_PARENT_ID', 'child');
        for(var s=0; s<=child_arr.length-1; s++){
          var parent = parentbranch(branchs,parseInt(child_arr[s].F_PARENT_ID,10));
          if(parent.length > 0){
            arr.push({
                "F_ID": parent[0].F_ID,
                "F_NAME": parent[0].F_NAME,
                "F_PARENT_ID": parent[0].F_PARENT_ID
            });
          }
        }
        tree = buildTree(arr,'F_ID','F_PARENT_ID','children');
        return tree;
      }
    }else{
      return false;
    }
  }
)
