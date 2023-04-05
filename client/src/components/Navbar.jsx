import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function MyNavBar(props) {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <div className="nav-container">
        <div className="logo">
          <h1>
            ICode
            <span>
              <em>& more</em>
            </span>
          </h1>
          <hr />
          <p>A PERSONAL BLOG</p>
        </div>
        <div className="links">
          <Link className="link" to={"/"}>
            <h5>Home</h5>
          </Link>
          <Link className="link" to={"/?cat=webdev"}>
            <h5>Web Dev</h5>
          </Link>
          <Link className="link" to={"/?cat=finance"}>
            <h5>Finance</h5>
          </Link>
          <div className="user">
            <span>User: Yazmin</span>
            <span>Logout</span>
            <span className="write">
              <Link className="link" to={"/write"}>
                Write
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default MyNavBar;
