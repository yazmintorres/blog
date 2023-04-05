import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [input, setInputs] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const resBody = await res.json();
      // if (res.status === 409) {
      //   setError(resBody);
      //   return;
      // }
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <button type="submit" className="btn-login">
          Login
        </button>
        <p>{error}</p>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
