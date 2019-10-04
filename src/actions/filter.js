export const showAll = ()=> ({
  type: 'SHOW_ALL',
})
export const showFilial = (filial)=> ({
  type: 'SHOW_FILIAL',
  filial: filial,
})
export const showBranch = (branch)=> ({
  type: 'SHOW_BRANCH',
  branch: branch
})

export const branchFilter = (filial,branch)=>{
  return (dispatch,getState)=>{
    if(filial && branch){
      dispatch(showBranch(branch))
    }else if (filial && !branch) {
      dispatch(showFilial(filial))
    }else if (!filial && branch) {
      dispatch(showBranch(branch))
    }else{
      dispatch(showAll())
    }
  }
}
