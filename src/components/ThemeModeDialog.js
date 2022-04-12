import React, { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import CustomThemePalette from './CustomThemePalette';
import { ThemeModeContext } from '../App';

const ThemeModeDialog = ({ open, onClose, canToggleMode }) => {
	const themeModeContext = useContext(ThemeModeContext);

	return (
		<Dialog onClose = {onClose} open = {open}>
			<DialogTitle sx = {{ textAlign: 'center', py: 1.5, fontSize: 15 }}>
				Theme
			</DialogTitle>
			{
				canToggleMode && (
					<ButtonGroup variant="outlined" fullWidth sx = {{ px: 1, pb: 2 }}>
					  <Button
					  	startIcon = {<LightModeIcon />}
					  	disableRipple
					  	sx = {{
					  		bgcolor: themeModeContext.mode === 'light' ? 'action.focus' : 'transparent',
					  		'&:hover': { bgcolor: 'action.focus' }
					  	}}
					  	onClick = {() => themeModeContext.setThemeMode.setMode('light')}
				  	>
				  		Light
			  		</Button>
					  <Button
					  	startIcon = {<DarkModeIcon />}
					  	disableRipple
					  	sx = {{
					  		bgcolor: themeModeContext.mode === 'dark' ? 'action.focus' : 'transparent',
					  		'&:hover': { bgcolor: 'action.focus' }
					  	}}
					  	onClick = {() => themeModeContext.setThemeMode.setMode('dark')}
				  	>
				  		Dark
			  		</Button>
					</ButtonGroup>
				)
			}
			<Box sx = {{ width: 240 }}>
				<Grid container spacing = {1} sx = {{ px: 1, pb: 1 }} >
					{
						Object.keys(CustomThemePalette).map((name) => (
							<Grid item
								key = {name}
								xs = {4}
							>
								<Box
									onClick = {() => themeModeContext.setThemeMode.setThemeValue(name)}
									sx = {{
										bgcolor: `${CustomThemePalette[name].light.primary.main}`,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: 70,
										boxShadow: 'nene',
										border: '1px solid',
										borderRadius: 1,
										borderColor: (theme) => theme.palette.text.primary,
										cursor: 'pointer'
									}}
								>
									{(themeModeContext.themeValue === name) && <CheckIcon sx = {{ color: 'white' }} /> }
								</Box>
							</Grid>
						))
					}
				</Grid>
			</Box>
		</Dialog>
	);
}


export default ThemeModeDialog;