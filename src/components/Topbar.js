import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme, alpha } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { ColorModeContext } from '../App';
import StyledIconButton from './StyledIconButton';
import Search from './Search';

const ColorModeButton = () => {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);
	return (
		<StyledIconButton
			onClick = {colorMode.toggleColorMode}
		>
			{theme.palette.mode === 'dark' ? <LightModeIcon fontSize = "small"/> : <DarkModeIcon fontSize = "small"/>}
		</StyledIconButton>
	);
};

const Topbar = () => {
	return (
		<AppBar position = "relative" sx = {{ boxShadow: 'none', zIndex: (theme) => (theme.zIndex.drawer + 1) }}>
			<Toolbar sx = {{ display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: "primary.contrastText" }}>
				<Box sx = {{ display: 'flex', alignItems: 'center' }}>
					<NoteAltIcon fontSize = "large" />
					<Box sx = {{ display: ['none', 'flex'], flexDirection: 'column', justifyContent: 'center', px: 2 }}>
						<Typography variant = "body2">
							Kiwhan Song
						</Typography>
						<Typography variant = "caption" sx = {{ fontSize: 10 }} >
							helloing-develop@gmail.com
						</Typography>
					</Box>
					<Divider orientation = "vertical" variant = "fullWidth" flexItem sx = {{ display: ['none', 'flex'], borderColor: 'primary.contrastText' }}/>
				</Box>
				<Box sx = {{ display: 'flex' }}>
					<Typography variant = "caption"
						sx = {{
							display: {'xs': 'none', 'lg': 'flex'},
							alignItems: 'center',
							border: 'solid 1px',
							borderColor: 'border.main',
							borderRadius: 3,
							bgcolor: '#AAA2',
							px: 2,
							height: '36px'
						}}
					>
						Record your study, Share your knowledge
					</Typography>
					<Search />
					<Box sx = {{ display: ['none', 'flex'] }}>
						<StyledIconButton>
							<AddLinkIcon fontSize = "small"/>
						</StyledIconButton>
						<StyledIconButton>
							<OpacityOutlinedIcon fontSize = "small"/>
						</StyledIconButton>
						<ColorModeButton />
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Topbar;