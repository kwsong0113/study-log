import React from 'react';

import Container from '@mui/material/Container';

import LoadingBox from '../components/LoadingBox';

const LoadingPage = () => {
	return (
		<Container sx = {{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
			<LoadingBox />
		</Container>
	);
};

export default LoadingPage;