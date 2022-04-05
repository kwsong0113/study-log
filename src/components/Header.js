import React, { useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { alpha } from '@mui/material/styles';
import StyledIconButton from './StyledIconButton';
import LeftDrawer from './LeftDrawer';
import StudyLog from './StudyLog';
import { drawerWidth } from '../App';

const Header = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = useMemo(() =>
		(() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)),
  []);
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
						Study Log
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
				<LeftDrawer always = {false} />
			</Drawer>
		</>
	);
};

export default Header;