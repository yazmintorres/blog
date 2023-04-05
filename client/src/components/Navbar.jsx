import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function MyNavBar(props) {
  const { currentUser, logout } = useContext(AuthContext);
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
            {/* the line below is using optional chaining */}
            {currentUser ? <span>User: {currentUser.username}</span> : null}
            {currentUser ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <Link style={{ fontWeight: "bold" }} className="link" to="/login">
                LOGIN
              </Link>
            )}
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
