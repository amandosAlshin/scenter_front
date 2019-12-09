const initialState = {
  column_count: 2
}
const column_count =(state = initialState, action)=> {
  switch (action.type) {
    case 'CHANGE_COUNT':
      return {
        ...state,
        column_count: action.data

      }
    default:
      return state
  }
}

export default column_count
