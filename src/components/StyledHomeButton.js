import React from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const StyledHommeButton = (props) => (
	<Button startIcon = {props.startIcon} onClick = {props.onClick} variant = "outlined" disableRipple fullWidth sx = {{
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		fontSize: 15,
		py: 2,
		fontWeight: 'normal',
		'& .MuiButton-startIcon': {
				pb: 1,
				m: 0,
		},
		'& .MuiButton-startIcon .MuiSvgIcon-root': {
			fontSize: 30,
		},
	}}>
		{props.children}
		<Typography variant = "caption" sx = {{
			color: (theme) => theme.palette.mode === 'light' ? 'grey.700' : 'grey.500',
			fontSize: 10,
			pt: 1,
		}}>
			{props.comment}
		</Typography>
	</Button>
);

export default StyledHommeButton;