import { GET_ACTIVE_PAGE, SET_ACTIVE_PAGE } from '../actions/activePage'

const initialState = {
  value: 'login'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVE_PAGE:
      return {
        ...state
      }

    case SET_ACTIVE_PAGE:
      return {
        ...state,
        value: action.value
      }
    default:
      return state
  }
}
