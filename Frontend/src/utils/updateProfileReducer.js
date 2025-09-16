export const actions = {
  updateFirstName: "UPDATE_FIRSTNAME",
  updateLastName: "UPDATE_LASTNAME",
  updateGender: "UPDATE_GENDER",
  updateAbout: "UPDATE_ABOUT",
  changePhotoUrl: "CHANGE_PHOTOURL",
  updateSkills: "UPDATE_SKILLS",
  updateAge: "UPDATE_AGE",
};

// "about", "photoUrl", "skills", "age"

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.updateFirstName:
      return { ...state, firstName: action.payload };
    case actions.updateLastName:
      return { ...state, lastName: action.payload };
    case actions.updateGender:
      return { ...state, gender: action.payload };
    case actions.updateAbout:
      return { ...state, about: action.payload };
    case actions.changePhotoUrl:
      return { ...state, photoUrl: action.payload };
    case actions.updateSkills:
      return { ...state, skills: action.payload };
    case actions.updateAge:
      return { ...state, age: action.payload };
    default:
      return state;
  }
};
