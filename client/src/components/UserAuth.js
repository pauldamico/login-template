import React, { useState } from "react";
import axios from "axios";
import AuthForm from "./AuthForm";
export default function UserAuth() {
  const [loginToggle, setLoginToggle] = useState(false);
  const [signUpToggle, setSignUpToggle] = useState(false);
  const [user, setUser] = useState({ username: "", token: {} });
  const [error, setError] = useState("")

  function loginToggler() {
    setLoginToggle(!loginToggle);
    clearError()
  }
  function signUpToggler() {   
    setSignUpToggle(!signUpToggle);
    clearError()
  }

  function clearError(){
    setError("")
  }
  function login(userInfo) {
    axios
      .post("/login", userInfo)
      .then((res) => console.log(res.data))
      .catch((err) => setError(err.response.data.errMsg));   
  }
  function signUp(userInfo) {
    axios
      .post("/signUp", userInfo)
      .then((res) => console.log(res))
      .catch((err) => setError(err.response.data.errMsg));   
  }

  return (
    <div>
    <div>
      {!signUpToggle && !loginToggle && user.token && <button onClick={loginToggler}>Login</button>}
      {!signUpToggle && ! loginToggle && <button onClick={signUpToggler}>Sign Up</button>}
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

    </div>
  );
}
