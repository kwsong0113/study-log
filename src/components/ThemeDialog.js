import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import CustomThemePalette from './CustomThemePalette';

const ThemeDialog = ({ onClose, themeValue, open }) => {
	return (
		<Dialog onClose = {() => onClose(themeValue)} open = {open}>
			<DialogTitle>Select Theme Color</DialogTitle>
			<Grid container spacing = {0} sx = {{ width: 1.0 }}>
				{
					Object.keys(CustomThemePalette).map((name) => (
						<Grid item
							key = {name}
							onClick = {() => onClose(name)}
							xs = {4}
							sx = {{
								bgcolor: `${CustomThemePalette[name].light.primary.main}`,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: '75px',
							}}
						>
							{(themeValue === name) && <CheckIcon sx = {{ color: 'white' }} /> }
						</Grid>
					))
				}
			</Grid>
		</Dialog>
	);
}

export default ThemeDialog;