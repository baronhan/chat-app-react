import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";
import { signup } from "../../config/firebase";

const Login = () => {
  const [currState, setCrrState] = useState("Sign up");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault(); /*Khi bấm submit thì nó ngăn không cho reload lại page */
    if (currState === "Sign up") {
      signup(userName, email, password);
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="form-login">
        <h2>{currState}</h2>
        {currState === "Sign up" ? (
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
            type="text"
            placeholder="username"
            className="form-input"
            required
          />
        ) : null}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email address"
          className="form-input"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="password"
          className="form-input"
        />
        <button type="submit">
          {currState === "Sign up" ? "Create account" : "Login now"}
        </button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Argee to the term of use & privacy policy.</p>
        </div>
        <div className="login-forgot">
          {currState === "Sign up" ? (
            <p className="login-toggle">
              Already have an account
              <span onClick={() => setCrrState("Login")}> Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an account
              <span onClick={() => setCrrState("Sign up")}> Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
