import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthCloudLogout = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({returnTo:"http://localhost:3000"} )}>
      Log Out
    </button>
  );
};

export default AuthCloudLogout;