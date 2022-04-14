import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const HomeFooter = () => {
	return (
		<AppBar position = "static" sx = {{ mt: 10, boxShadow: 'none', bgcolor: 'background.default', backgroundImage: 'none' }}>
			<Toolbar
				sx = {{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					bgcolor: (theme) => theme.palette.mode === 'light' ? '#0000000E' : '#00000027',
					color: 'text.primary',
				}}
			>
				<Typography variant = "body2">Copyright © 2022 Kiwhan Song</Typography>
				<Box>
					
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default HomeFooter;