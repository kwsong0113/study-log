import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { UserDataContext } from '../components/UserDataProvider';
import StyledLink from '../components/StyledLink';

const HomePage = () => {
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const { username } = useContext(UserDataContext);

	return (
		<Container sx = {{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
			<Typography variant = "h4">HomePage</Typography>
			{
				isAuthenticated ? (
					<Button fullWidth variant = "outlined" onClick = {() => logout()}>
						Log out
					</Button>
				) :
				(
					<Button fullWidth variant = "outlined" onClick = {() => loginWithRedirect()}>
						Sign in
					</Button>
				)
			}
			{
				isAuthenticated && (
					<>
						<Typography variant = "h4">
							Hello, {username}
						</Typography>
	        </>
				)
			}
			<Grid container spacing = {1}>
				<Grid item xs = {4}>
					<StyledLink to = "/studylog/123">
						<Button fullWidth variant = "outlined">Study Log</Button>
					</StyledLink>
				</Grid>
				<Grid item xs = {4}>
					<StyledLink to = "/todos/123">
						<Button fullWidth variant = "outlined">Todos</Button>
					</StyledLink>
				</Grid>
				<Grid item xs = {4}>
					<StyledLink to = "/community">
						<Button fullWidth variant = "outlined">Community</Button>
					</StyledLink>
				</Grid>
			</Grid>

		</Container>
	);
};

export default HomePage;