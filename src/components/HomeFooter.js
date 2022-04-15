import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';

import GitHubIcon from '@mui/icons-material/GitHub';

const MuiIcon = () => {
	return (
		<SvgIcon sx = {{ height: 24 }} viewBox = "0 0 36 32">
			<path d = "M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839zM31 7.234a1 1 0 001.514.857l3-1.8A1 1 0 0036 5.434V1.766A1 1 0 0034.486.91l-3 1.8a1 1 0 00-.486.857v3.668z" />
		</SvgIcon>
	);
};

const ReactIcon = () => {
	return (
		<SvgIcon sx = {{ height: 24 }} viewBox = "-11.5 -10.23174 23 20.46348">
			<circle cx="0" cy="0" r="2.05" fill="currentColor" />
		  <g stroke="currentColor" strokeWidth="1" fill="none">
		    <ellipse rx="11" ry="4.2"/>
		    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
		    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
		  </g>
  	</SvgIcon>
	)
}

const HomeFooter = () => {
	return (
		<AppBar position = "static" sx = {{ mt: 10, boxShadow: 'none', bgcolor: 'background.default', backgroundImage: 'none' }}>
			<Toolbar
				sx = {{
					display: 'flex',
					flexDirection: ['column', 'row'],
					justifyContent: 'space-between',
					alignItems: 'center',
					bgcolor: 'none',
					borderTop: '1px solid',
					color: (theme) => theme.palette.mode === 'light' ? 'grey.700' : 'grey.500',
					borderColor: 'border.main',
					px: '0 !important',
					py: 3
				}}
			>
				<Typography variant = "body2">Copyright © 2022 Kiwhan Song</Typography>
				<Box display = "flex" sx = {{ mt: [1, 0] }}>
					<IconButton sx = {{ color: 'inherit' }} onClick = {() => window.open('https://github.com/kwsong0113/study-log', '_blank')}>
						<GitHubIcon />
					</IconButton>
					<IconButton sx = {{ color: 'inherit', ml: 1 }} onClick = {() => window.open('https://reactjs.org', '_blank')}>
						<ReactIcon />
					</IconButton>
					<IconButton sx = {{ color: 'inherit', ml: 1 }} onClick = {() => window.open('https://mui.com', '_blank')}>
						<MuiIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default HomeFooter;