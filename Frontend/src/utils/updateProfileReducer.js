export const actions = {
  updateAbout: "UPDATE_ABOUT",
  changePhotoUrl: "CHANGE_PHOTOURL",
  updateSkills: "UPDATE_SKILLS",
  updateAge: "UPDATE_AGE",
};

// "about", "photoUrl", "skills", "age"

export const reducer = (state, action) => {
  switch (action.type) {
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


