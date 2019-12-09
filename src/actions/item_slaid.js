export const stateSlaid = (data)=> ({
  type: 'CHANGE',
  data: data
})

export const itemSlaid = (slaids)=>{
  return (dispatch)=>{
    dispatch(stateSlaid(slaids))
  }
}
