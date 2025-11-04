import { Link } from "react-router";

export const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal text-white bg-[#ff1e65] border-2 border-dashed p-10">
        <nav>
          <h6 className="footer-title">Pages</h6>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/auth" className="link link-hover">
            Login
          </Link>
          <Link to="/auth" className="link link-hover">
            Signup
          </Link>
          <Link to="/profile" className="link link-hover">
            Profile
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </>
  );
};
