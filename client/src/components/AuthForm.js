import React, { useState } from "react";


export default function AuthForm(props) {
  const {clearError, error, loginToggle, authenticateUser, loginToggler } = props;
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  function formChangeHandler(event) {
    const { value, name } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  }
  function formLogin(event) {
    clearError()
    event.preventDefault();
    authenticateUser(userInfo)    
  }

  return (
    <div className="auth-div">
      <form onSubmit={formLogin} className="auth-form">
        <label>Username </label>
        <input data-testid="username-input" name="username" onChange={formChangeHandler} type="text" />
        <label>Password </label>
        <input name="password" onChange={formChangeHandler} type="text" />
         <button >{loginToggle ? "Login" : "Sign Up"}</button>
        <button type="button" onClick={()=>{loginToggler()}}>Back</button>        
      </form>
      {error}
    </div>
  );
}
