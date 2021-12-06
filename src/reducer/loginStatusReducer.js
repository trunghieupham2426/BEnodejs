const isLoggedIn = false;

const loginStatusReducer = (state = isLoggedIn, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return (state = !state);
    case "LOGGED_OUT":
      return (state = !state);

    default:
      return state;
  }
};

export default loginStatusReducer;
