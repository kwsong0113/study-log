import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import LoadingBox from '../components/LoadingBox';
import ErrorMessage from '../components/ErrorMessage';
import StyledLink from '../components/StyledLink';
import UserDataProvider, { UserDataContext } from '../components/UserDataProvider';

const domain = process.env.REACT_APP_API_DOMAIN;

const CommunityPage = () => {
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(0);
	const [users, setUsers] = useState([]);
	const { username: loggedInUsername } = useContext(UserDataContext);

	useEffect(() => {
		setIsLoading((previousIsLoading) => previousIsLoading + 1);
		axios.get(`${domain}/users`)
			.then((response) => {
				setUsers((response.data));
				setIsError(false);
				setIsLoading((previousIsLoading) => previousIsLoading - 1);
			})
			.catch((error) => {
				setIsError(true);
				setIsLoading((previousIsLoading) => previousIsLoading - 1);
			});
	}, []);

	if (isLoading > 0) {
		return <LoadingBox />
	}

	if (isError) {
		return <ErrorMessage message = "Something went wrong. Try again." />;
	}

	return (
		<Grid container spacing = {2} sx = {{ p: 3 }}>
			{
				users.map(({ email, username, numStudyLogs, geoip }) => (
					username !== loggedInUsername && (
						<Grid item key = {username} xs = {12} smd = {6} lg = {4} xl = {3}>
							<Card
								sx = {{
									bgcolor: 'background.default',
									border: '1px solid',
									borderColor: 'border.main',
								}}
							>
								<CardHeader
									sx = {{
										py: 1.5,
										bgcolor: '#AAA2',
										'& .MuiCardHeader-title': { fontSize: 16, fontWeight: '500', color: 'primary.main' },
										'& .MuiCardHeader-subheader': { fontSize: 12 }
									}}
									action = {
										<Box sx = {{ display: 'flex' }}>
											<StyledLink to = {`/studylog/${username}`}>
												<IconButton>
													<SummarizeOutlinedIcon />
												</IconButton>
											</StyledLink>
											<StyledLink to = {`/todos/${username}`}>
												<IconButton>
													<EventAvailableOutlinedIcon />
												</IconButton>
											</StyledLink>
										</Box>
									}
									title = {username}
									subheader = {email}
								/>
								<CardContent sx = {{ pb: '16px !important' }}>
									<Box sx = {{ display: 'flex', alignItems: 'flex-end' }}>
										{geoip && (
											<>
												<LocationOnOutlinedIcon sx = {{ fontSize: 23, mr: 0.5 }} />
												<Typography noWrap variant = "body2" sx = {{ mr: 1.5 }}>{`${geoip.cityName}, ${geoip.countryCode3}`}</Typography>
											</>
										)}
										<StarBorderOutlinedIcon sx = {{ fontSize: 23, mr: 0.5 }} />
										<Typography variant = "body2">{numStudyLogs}</Typography>
									</Box>
								</CardContent>
							</Card>
						</Grid>
					)
				))
			}
		</Grid>
	);
};

export default CommunityPage;