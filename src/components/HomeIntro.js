import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';

import StyledHomeButton from '../components/StyledHomeButton';
import StyledLink from '../components/StyledLink';
import { UserDataContext } from '../components/UserDataProvider';


const  HOMEINTRO_CONTENTS = {
	introMessage1: 'Record your Study,',
	introMessage2: 'Share your Knowledge',
	introContent: 'SLog offers various tools to help you organize study records and structuralize study plans. With SLog, record your study daily and share your study life with others.',
};

const HomeIntro = () => {
	const { isAuthenticated, loginWithPopup, logout } = useAuth0();
	const { username } = useContext(UserDataContext);

	return (
		<Box sx = {{ py: 5 }}>
			<Typography variant = "h3" sx = {{
				fontSize: { xs: 32, sm: 40, xl: 52},
				color: 'primary.lightMain',
				fontWeight: 600,
				textAlign: {xs: 'center', md: 'left'} }}
			>
				{HOMEINTRO_CONTENTS .introMessage1}
			</Typography>
			<Typography variant = "h3" gutterBottom sx = {{
				fontSize: { xs: 32, sm: 40, xl: 52},
				color: 'text.primary',
				fontWeight: 600,
				textAlign: {xs: 'center', md: 'left'}}}
			>
				{HOMEINTRO_CONTENTS .introMessage2}
			</Typography>
			<Typography variant = "body2" sx = {{ color: (theme) => theme.palette.mode === 'light' ? 'grey.700' : 'grey.500', textAlign: {xs: 'center', md: 'left'}, mb: 3 }}>
				{HOMEINTRO_CONTENTS .introContent}
			</Typography>
			<Grid container spacing = {2}>
				{isAuthenticated ? (
					<>
						<Grid item xs = {4}>
							<StyledHomeButton startIcon = {<LoginOutlinedIcon />} comment = {`From ${username}`} onClick = {() => logout()}>
								Logout
							</StyledHomeButton>
						</Grid>
						<Grid item xs = {4}>
							<StyledLink to = {`/studylog/${username}`} sx = {{ height: '100%' }}>
								<StyledHomeButton startIcon = {<SummarizeOutlinedIcon />} comment = "to record your study">
									My
								</StyledHomeButton>
							</StyledLink>
						</Grid>
						<Grid item xs = {4}>
							<StyledLink to = "community" sx = {{ height: '100%' }}>
								<StyledHomeButton startIcon = {<LanguageOutlinedIcon />} comment = "to learn from others">
									Community
								</StyledHomeButton>
							</StyledLink>
						</Grid>
					</>
				) : (
					<>
						<Grid item xs = {6}>
							<StyledHomeButton startIcon = {<LoginOutlinedIcon />} comment = "to record your study" onClick = {() => loginWithPopup()}>
								Sign in
							</StyledHomeButton>
						</Grid>
						<Grid item xs = {6}>
							<StyledLink to = "community" sx = {{ height: '100%' }}>
								<StyledHomeButton startIcon = {<LanguageOutlinedIcon />} comment = "to learn from others">
									Community
								</StyledHomeButton>
							</StyledLink>
						</Grid>
					</>
				)
			}
			</Grid>
		</Box>
	);
};

export default HomeIntro;