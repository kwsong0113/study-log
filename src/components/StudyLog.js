import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { styled } from '@mui/material/styles';
import { drawerWidth } from '../App';

const StyledButton = styled((props) => (
	<Button {...props} fullWidth disableRipple
		endIcon = {<ArrowForwardIosOutlinedIcon />}
	></Button>)
)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	border: '1px solid',
	borderColor: theme.palette.border.main,
	borderRadius: theme.shape.borderRadius,
	textTransform: 'capitalize',
	fontSize: '13px',
	fontWeight: 'normal',
	padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
	color: theme.palette.text.primary,
	'& .MuiButton-endIcon .MuiSvgIcon-root': {
		fontSize: '12px',
	},
}));

const StudyLog = () => {
	return (
		<Box sx = {{ ml: [0, `${drawerWidth}px`] }}>
			<Grid container spacing = {2} sx = {{ p: 3 }}>
				<Grid item xs = {12} smd = {6} lg = {4}>
					<StyledButton >
						<Box display = "flex" sx = {{ alignItems: 'center' }} >
							<CalendarMonthOutlinedIcon sx = {{ mr: 2, fontSize: 25 }} />
							Select Date
						</Box>
					</StyledButton>
				</Grid>
				<Grid item xs = {12} smd = {6} lg = {4}>
					<StyledButton>
						<Box display = "flex" sx = {{ alignItems: 'center' }}>
							<PsychologyOutlinedIcon sx = {{ mr: 2, fontSize: 25 }} />
							Select Subject
						</Box>
					</StyledButton>
				</Grid>
			</Grid>		
				
		</Box>
	);
};

export default StudyLog;