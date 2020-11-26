const userActions = {
  SET_USER: "SET_USER",

  setUser: (data) => ({
    type: userActions.SET_USER,
    data
  })
}

export { userActions }