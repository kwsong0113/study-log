import React, { useState, useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import StyledIconButton from './StyledIconButton';
import LeftDrawer from './LeftDrawer';
import { drawerWidth } from '../App';
import { UserDataContext } from './UserDataProvider';

const locationToTitle = (location, username) => {
	const splitLocation = location.pathname.split('/');
	if (splitLocation.length === 2) {
		if (splitLocation[1] === 'community') return 'Community';
	} else if (splitLocation.length === 3) {
		const viewName = splitLocation[2] === username ? 'My' : splitLocation[2] + ' -';
		if (splitLocation[1] === 'studylog') {
			return `${viewName} Study Log`;
		} else if (splitLocation[1] === 'todos') {
			return `${viewName} Todos`;
		}
	}
	return 'Oops!'
}

const Header = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = useMemo(() =>
		(() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)),
  []);
	const { username } = useContext(UserDataContext);
	const location = useLocation();

	return (
		<>
			<AppBar
				position = "static"
				sx = {{
					bgcolor: 'none',
					boxShadow: 'none',
					borderTop: 'none',
					borderBottom: '1px solid',
					borderBottomColor: 'border.main',
					width: [1.0, `calc(100% - ${drawerWidth}px)`],
					ml: [0, `${drawerWidth}px`],
					zIndex: (theme) => theme.zIndex.drawer + 1
				}}>
				<Toolbar variant = "dense" sx = {{ bgcolor: 'background.default' }} >
					<StyledIconButton
						sx = {{
							display: ['span', 'none'],
							borderColor: 'border.main',
							color: 'primary.main', 
							mr: 2, 
							ml: 0, 
							height: 30, 
							width: 30,
					  }}
						onClick = {handleDrawerToggle}
				 	>
						{mobileOpen ? <CloseOutlinedIcon fontSize = "small" /> : <DragHandleIcon fontSize = "small"/>}
					</StyledIconButton>
					<Typography color = "text.primary" variant = "body2">
						{locationToTitle(location, username)}
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant = "permanent"
				open
				sx = {{
					display: ['none', 'block'],
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
						bgcolor: 'background.default',
					}
				}}
			>
				<LeftDrawer always = {true} />
			</Drawer>
			<Drawer
				variant = "temporary"
				open = {mobileOpen}
				onClose = {handleDrawerToggle}
				ModalProps = {{ keepMounted: true }}
				sx = {{
					display: ['block', 'none'],
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
						bgcolor: 'background.default',
					}
				}}
			>
				<LeftDrawer always = {false} onClose = {handleDrawerToggle} />
			</Drawer>
		</>
	);
};

export default Header;