import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Topbar from '../components/Topbar';
import HomeIntro from '../components/HomeIntro';
import HomeTools from '../components/HomeTools';
import HomeFeatures from '../components/HomeFeatures';
import HomeFooter from '../components/HomeFooter';

const HomePage = () => {
	return (
		<>
			<Topbar home = {true}/>
			<Container sx = {{ maxWidth: { xs: 500, md: 900, xl: 1200 } }}>
				<Grid container spacing = {5} sx = {{ mt: 10 }}>
					<Grid item xs = {12} md = {6} sx = {{ display: 'flex', alignItems: 'center' }}>
						<HomeIntro />
					</Grid>
					<Grid item xs = {12} md = {6}>
					   <HomeTools />
					</Grid>
				</Grid>
				<HomeFeatures />
				<HomeFooter />
			</Container>
		</>
	);
};

export default HomePage;