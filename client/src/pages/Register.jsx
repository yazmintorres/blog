import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [input, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => console.log(input), [input]);

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
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
          type="email"
          placeholder="email"
          name="email"
          value={input.email}
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
        <button className="btn-register">Register</button>
        <p>This is an error!</p>
        <span>
          Have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
