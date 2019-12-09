export const columnCount = (data)=> ({
  type: 'CHANGE_COUNT',
  data: data
})

export const changeCount = (count)=>{
  return (dispatch)=>{
    dispatch(columnCount(count))
  }
}
