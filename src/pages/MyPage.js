import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { UserDataContext } from '../components/UserDataProvider';
import LoadingPage from './LoadingPage';

const MyPage = () => {
  const { isAuthenticated } = useAuth0();
  const { username } = useContext(UserDataContext);

  if (isAuthenticated) {
    return (username ? <Navigate replace to = {`/studylog/${username}`} /> : <LoadingPage />)
  }
	return (
    <Navigate replace to = "/" />
	);
};

export default MyPage;