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
