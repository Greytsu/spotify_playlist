export const GET_ACTIVE_PAGE = 'GET_ACTIVE_PAGE'
export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE'

export const getActivePage = () => ({
  type: GET_ACTIVE_PAGE
})

export const setActivePage = activePage => ({
  type: SET_ACTIVE_PAGE,
  value: activePage
})
