import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import { ColorModeContext } from '../App';

const ColorModeButton = () => {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);
	return (
		<IconButton onClick = {colorMode.toggleColorMode}>
			{theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
		</IconButton>
	);
}

const Topbar = () => {
	return (
		<AppBar position = "static">
			<Toolbar variant = "dense" sx = {{ bgcolor: 'background.default' }}>
				<ColorModeButton />
			</Toolbar>
		</AppBar>
	);
};

export default Topbar;