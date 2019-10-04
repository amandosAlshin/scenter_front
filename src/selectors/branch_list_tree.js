import { createSelector } from 'reselect'
var _ = require('lodash');
const branchsStatus = (state) => state.branch_list.success.status;
const branchs = (state) => state.branch_list.success.data;
const buildTree=(flatList, idFieldName, parentKeyFieldName, fieldNameForChildren)=>{
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
export const branchListTree = createSelector(
  [ branchsStatus,branchs],
  (branchsStatus,branchs) => {
    if(branchsStatus){
      var tree = buildTree(branchs,'F_ID','F_PARENT_ID','children');
      if(tree.length===1){
        var filial = _.filter(tree[0].children, function(o) {return o.children.length>0});
        return filial;
      }else if (tree.length>1) {
        return tree;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
)
