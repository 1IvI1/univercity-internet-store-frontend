import { userActions } from "./actions"

const initialState = {
  user: null
}

const setUser = (state, data) => (
  { ...state, user: data }
)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.SET_USER:
      return setUser(state, action.data)
    default:
      return { ...state }
  }
}

export default reducer