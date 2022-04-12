import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme, alpha } from '@mui/material/styles';

import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import AddLinkIcon from '@mui/icons-material/AddLink';

import { ThemeModeContext } from '../App';
import StyledIconButton from './StyledIconButton';
import Search from './Search';
import ThemeModeDialog from './ThemeModeDialog';
import StyledLink from './StyledLink';
import { UserDataContext } from './UserDataProvider';

const ColorModeButton = () => {
	const themeModeContext = useContext(ThemeModeContext);
	const theme = useTheme();
	const toggleMode = () => {
		themeModeContext.setThemeMode.setMode((previousMode) => 
			previousMode === 'dark' ? 'light' : 'dark'
		);
	};

	return (
		<StyledIconButton onClick = {toggleMode}>
			{theme.palette.mode === 'dark' ? <LightModeIcon fontSize = "small"/> : <DarkModeIcon fontSize = "small"/>}
		</StyledIconButton>
	);
};

const Topbar = () => {
	const { user } = useAuth0();
	const { username } = useContext(UserDataContext);
	const [dialogOpen, setDialogOpen] = useState(false);

	const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

	return (
		<AppBar position = "relative" sx = {{ boxShadow: 'none', zIndex: (theme) => (theme.zIndex.drawer + 1) }}>
			<Toolbar sx = {{ display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: "primary.contrastText" }}>
				<Box sx = {{ display: 'flex', alignItems: 'center' }}>
					<StyledLink to = "/">
						<NoteAltIcon fontSize = "large" />
					</StyledLink>
					<Box sx = {{ display: ['none', 'flex'], flexDirection: 'column', justifyContent: 'center', px: 2 }}>
						<Typography variant = "body2">
							{username || 'Visitor'}
						</Typography>
						<Typography variant = "caption" noWrap sx = {{ width: '137.02px', fontSize: 10 }} >
							{user?.email || 'Sign in to record your study'}
						</Typography>
					</Box>
					<Divider orientation = "vertical" variant = "fullWidth" flexItem sx = {{ display: ['none', 'flex'], borderColor: 'primary.contrastText' }}/>
				</Box>
				<Box sx = {{ display: 'flex' }}>
					<StyledLink to = "/">
						<Typography variant = "caption"
							sx = {{
								display: {'xs': 'none', 'lg': 'flex'},
								alignItems: 'center',
								border: 'solid 1px',
								borderColor: (theme) => alpha(theme.palette.grey[300], theme.palette.mode === 'dark' ? 1.0 : 0.3),
								borderRadius: 3,
								bgcolor: '#AAA2',
								px: 2,
								height: '36px'
							}}
						>
							Record your study, Share your knowledge
						</Typography>
					</StyledLink>
					<Search />
					<Box sx = {{ display: ['none', 'flex'] }}>
						<StyledIconButton>
							<AddLinkIcon fontSize = "small"/>
						</StyledIconButton>
						<StyledIconButton onClick = {handleClickOpen}>
							<OpacityOutlinedIcon fontSize = "small"/>
						</StyledIconButton>
						<ThemeModeDialog onClose = {handleClose} open = {dialogOpen} canToggleMode = {false} />
						<ColorModeButton />
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Topbar;