export const reducer = (state, action) => {
  switch (action.type) {
    case "PUT_FIRSTNAME":
      return { ...state, firstName: action.payload };
    case "PUT_LASTNAME":
      return { ...state, lastName: action.payload };
    case "PUT_EMAIL":
      return { ...state, email: action.payload };
    case "PUT_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
