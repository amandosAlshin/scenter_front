const initialState = {
  filter: false,
  filial: false,
  branch: false
}
const filter =(state = initialState, action)=> {
  switch (action.type) {
    case 'SHOW_ALL':
      return {
        ...state,
        filter: false,
        filial: false,
        branch: false

      }

    case 'SHOW_FILIAL':
      return {
        ...state,
        filter: true,
        filial: action.filial,
        branch: false
      }

    case 'SHOW_BRANCH':
      return {
        ...state,
        filter: true,
        filial: false,
        branch: action.branch
      }
    default:
      return state
  }
}

export default filter
