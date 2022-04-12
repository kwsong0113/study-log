import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import LoadingPage from '../pages/LoadingPage';

export const UserDataContext = React.createContext({});
const domain = process.env.REACT_APP_AUTH0_DOMAIN;

const UserDataProvider = (props) => {
	const { isLoading, user, getAccessTokenSilently } = useAuth0();
	const [userData, setUserData] = useState({});

	const getUserdata = async () => {
    try {
  			console.log('Auth0 API Call');

	      const accessToken = await getAccessTokenSilently({
	        audience: `https://${domain}/api/v2/`,
	        scope: "read:current_user",
	      });

	      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

	      const { data: { username } }  = await axios.get(userDetailsByIdUrl, {
	        headers: {
	          Authorization: `Bearer ${accessToken}`,
	        },
	      });
	      setUserData((previousUserData) => ({ ...previousUserData, username }));
    } catch (e) {
      console.log(e.message);
	  }
  };

	useEffect(() => { if (user?.sub) { getUserdata() } },
		[getAccessTokenSilently, user?.sub]);

	if (isLoading) return (<LoadingPage />);
	return (
		<UserDataContext.Provider value = {userData} {...props} />	
	);
}

export default UserDataProvider;