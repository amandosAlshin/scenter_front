
export const statusBranch = (branches,filter,filter_filial,filter_branch)=> {
  var data_dispatch=[];
  if(filter && filter_branch){
    var branch=[],
        filial_branch=[];
    var l = 0;
    while (l<=branches.length-1) {
      for(var fl = 0; fl<=branches[l].children.length-1; fl++){
        if(parseInt(branches[l].children[fl].F_ID,10) === parseInt(filter_branch,10)){
          branch.push(branches[l].children[fl]);
          filial_branch.push(branches[l]);
          break;
        }
      }
      l++;
    }

    data_dispatch = {
      general_filter_filial: filial_branch,
      branch_list: branch
    }
    return data_dispatch;
  }else if (filter && filter_filial) {
    var filial=[];
    var i = 0;
    while (i<=branches.length-1) {
      if(parseInt(branches[i].F_ID,10)===parseInt(filter_filial[0].F_PARENT_ID,10)){
        filial.push(branches[i]);
        break;
      }
      i++;
    }
    if(filial.length>0){
      data_dispatch = {
        general_filter_filial: filial,
        branch_list: filter_filial
      }
      return data_dispatch;
    }else{
      return false;
    }
  }else{
    if(branches.length===1){
      data_dispatch = {
        general_filter_filial: branches,
        branch_list: branches[0].children
      }
    }else{
      data_dispatch = {
        general_filter_filial: branches,
        branch_list: []
      }
    }

    return data_dispatch;
  }
}
