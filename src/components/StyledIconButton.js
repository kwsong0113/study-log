import React from 'react';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';

const StyledIconButton = styled((props) => <IconButton {...props} size = "small" disableRipple = {true} />)(({ theme }) => ({
	color: "inherit",
	border: 'solid 1px',
	borderColor: alpha(theme.palette.grey[300], theme.palette.mode === 'dark' ? 1.0 : 0.3),
	borderRadius: theme.shape.borderRadius * 3,
	marginLeft: theme.spacing(2),
	height: '36px',
	width: '36px',
	'&:hover': {
		cursor: 'pointer',
		backgroundColor: '#AAA3'
	},
}));

export default StyledIconButton;

