import React from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const AuthCloudLogin = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default AuthCloudLogin;