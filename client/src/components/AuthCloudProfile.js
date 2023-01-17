import React, {useState, useEffect} from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";


  const AuthCloudProfile = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    const [token, setToken] = useState();
  
    useEffect(() => {
  
      const getUserMetadata = async () => {
        const domain = "dev-0zd4zxu226vwide7.us.auth0.com";

        try {
          const accessToken = await getAccessTokenSilently({            
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          });

          const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
    
          const metadataResponse = await fetch(userDetailsByIdUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`, },       
          }
          
          );

          const { user_metadata } = await metadataResponse.json();
        
          setUserMetadata(user_metadata);
        } catch (e) {
          console.log(e.message);
        }
      };
    
      getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
      console.log({userInfo:user.email, token:accessToken});
    };


    const sendRequest = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get('http://localhost:8080/', { headers });
        console.log(response.data);      
      } catch (error) {
        console.error(error);
      }
    };

return (
  isAuthenticated && (
    <div>
        <button onClick={sendRequest}>Send Request</button>
      <button onClick={getToken}>Get Token</button>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <h3>User Metadata</h3>
      {userMetadata ? (
        <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
      ) : (
        "No user metadata defined"
      )}
    </div>
  )
);
}

export default AuthCloudProfile;