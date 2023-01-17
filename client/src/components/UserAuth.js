import React, { useState } from "react";
import axios from "axios";
import AuthForm from "./AuthForm";
import AuthCloudLogin from "./AuthCloudLogin";
import AuthCloudProfile from "./AuthCloudProfile";
import AuthCloudLogout from "./AuthCloudLogout";

export default function UserAuth() {
  const [loginToggle, setLoginToggle] = useState(false);
  const [signUpToggle, setSignUpToggle] = useState(false);
  const [currentLogin, setCurrentLogin] = useState(JSON.parse(localStorage.getItem("user"))||{ username: {}, token: "" });
  const [error, setError] = useState("");





  function loginToggler() {
    setLoginToggle(!loginToggle);
    clearError();
  }
  function signUpToggler() {
    setSignUpToggle(!signUpToggle);
    clearError();
  }

  function clearError() {
    setError("");
  }
  function login(userInfo) {
    axios
      .post("/login", {username:userInfo.username, password:userInfo.password})
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data))
        console.log(res)
        setCurrentLogin(prev=>res.data)
        setLoginToggle(false)
      })     
  
      .then(res=>currentLogin.user.username && alert("logged in"))
      .catch((err) => setError(err.response.data.errMsg));
  }
  function signUp(userInfo) {
    axios
      .post("/signUp", {username:userInfo.username, password:userInfo.password})
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data))
        console.log(res)
        setCurrentLogin(prev=>res.data)
      })       
      .then(res=>currentLogin.user.username && alert("logged in"))
      .catch((err) => setError(err.response.data.errMsg));
      setSignUpToggle(false)
  }

  return (
    <div>
     
      {currentLogin.token && `Logged in as ${currentLogin.user.username}`}
      <div>
        {!currentLogin.token && (
          <button onClick={loginToggler}>Login</button>
        )}
        {!currentLogin.token && (
          <button onClick={signUpToggler}>Sign Up</button>
        )}
        {loginToggle && (
          <AuthForm
            clearError={clearError}
            error={error}
            loginToggle={loginToggle}
            loginToggler={loginToggler}
            authenticateUser={login}
          />
        )}
        {signUpToggle && (
          <AuthForm
            clearError={clearError}
            signUpToggle={signUpToggle}
            error={error}
            loginToggler={signUpToggler}
            authenticateUser={signUp}
          />
        )}
      </div>
      <AuthCloudLogin/>
      <AuthCloudLogout/>
      <AuthCloudProfile/>
    </div>
  );
}
