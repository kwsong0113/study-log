import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const HomeStatisticsItem = ({ number, comment }) => {
	return (
		<Grid item xs = {6} md = {4}>
			<Box sx = {{ borderLeft: '1px solid', borderColor: (theme) => theme.palette.mode === 'light' ? 'grey.400' : 'grey.700', pl: 2, py: 0.5 }}>
				<Typography variant = "h5" sx = {{ fontWeight: 600, color: 'primary.light'}}>{number}</Typography>
				<Typography variant = "body2" sx = {{ color: (theme) => theme.palette.mode === 'light' ? 'grey.700' : 'grey.500'}}>{comment}</Typography>
			</Box>
		</Grid>
	);
};

const HomeStatistics = () => {
	return (
		<Box
			sx = {{
				bgcolor: (theme) => theme.palette.mode === 'light' ? '#0000000E' : '#00000027',
				mt: 15,
				py: 5,
				mx: -300,
				px: 300,
			}}
		>
			<Typography variant = "subtitle1" sx = {{ color: 'primary.lightMain', fontWeight: 600, fontSize: 15, mb: 2 }}>Active Community</Typography>
			<Grid container spacing = {3}>
				<HomeStatisticsItem number = "1.5k" comment = "Users" />
				<HomeStatisticsItem number = "3.2k" comment = "Monthly Visits" />
				<HomeStatisticsItem number = "31k" comment = "Study Logs" />
			</Grid>
		</Box>
	);
};

export default HomeStatistics;