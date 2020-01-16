const initialState = {
  state_slaid: [true,true,true,true,true,true]
}
const state_slaid =(state = initialState, action)=> {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        state_slaid: action.data

      }
    default:
      return state
  }
}

export default state_slaid
