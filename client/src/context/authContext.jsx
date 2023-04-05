import { createContext, useState } from "react";

const AuthContext = createContext();

const Provider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (input) => {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const resBody = await res.json();
    console.log(resBody);
    if (res.status === 404) {
      setError(resBody);
      return;
    }
    if (res.status === 400) {
      setError(resBody);
      return;
    }
    setCurrentUser(resBody);
  };

  const logout = async (input) {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const resBody = await res.json();
    console.log(resBody);
    setCurrentUser(null);
  }
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
