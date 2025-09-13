import { Outlet } from "react-router";
import { Footer } from "../components/Footer.jsx";
import Navabar from "../components/Navbar.jsx";

export const Body = () => {
  return (
    <>
      <Navabar />
      {/* this is place where any children route of the body will enter here ie. outlet */}
      <Outlet />
      <Footer />
    </>
  );
};
// now we will create the feature that as we login we will move to the feed page  and as we will logout we will move to the login page.
// now we will create a check that token is present or not as token is coming to the browser as we login, so we will create the check here in this component for the token is present or not.
// also when token is present then on refreshing the page the data of login got erased in the redux store. we will solve the problem as well. as we need to be login as we have the token.
// but now when we go to any route this body will make an another api call to get the data of user from the profile. so to stop this we will check that the redux store contains the data or not.
