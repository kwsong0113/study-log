import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const LoadingPage = () => {
	return (
		<Container sx = {{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
			<Typography variant = "h4">Loading...</Typography>
		</Container>
	);
};

export default LoadingPage;