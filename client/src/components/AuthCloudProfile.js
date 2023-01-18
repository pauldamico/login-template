import React, {useState, useEffect} from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";


  const AuthCloudProfile = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState();
  
    

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently( );
      setToken(accessToken);
      console.log({userInfo:user.email, token:accessToken});
    };


    const sendRequest = async () => {
      try {
        const accessToken = await getAccessTokenSilently()
        const headers = {
          Authorization: `Bearer ${accessToken}`,
         
        };
        const response = await axios.get('http://localhost:9000/authorized', { headers });
        console.log(response);      
      } catch (error) {
        console.error(error);
      }
    };

return (
  isAuthenticated && (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
);
}

export default AuthCloudProfile;