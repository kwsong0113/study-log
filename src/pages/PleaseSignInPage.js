import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const PleaseSignInPage = () => {
	return (
		<Container sx = {{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
			<Typography variant = "h4">Please Sign in to use this service</Typography>
		</Container>
	);
};

export default PleaseSignInPage;