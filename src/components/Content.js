import React, { useState, useEffect, useMemo, createRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { styled } from '@mui/material/styles';
import { drawerWidth } from '../App';
import StudyLog from './StudyLog';
import DatePickerDialog from './DatePickerDialog';

const data = [
	{
		date: '03/29/2022',
		subjects: ['Android + OpenCV', 'ReactJS + MUI'],
		content: [
			{
				log: 'Try using OpenCV library in Android',
				subLogs: [
					'Show camera (using JavaCamera2View / full screen)',
					'Test with OBS virtual camera'
				]
			},
			{
				log: 'ReactJS + MUI travel advisor website',
				subLogs: [
					'Rapid API / GoogleMap API',
					'MUI component: InputBase'
				]
			},
		]
	},
	{
		date: '03/30/2022',
		subjects: ['Android + OpenCV', 'ReactJS + MUI'],
		content: [
			{
				log: 'Android + OpenCV for image processing',
				subLogs: [
					'Convert rgba to grayscale iamge',
					'Face detection: performs well (0.50 - 1.50 FPS: quite slow)'
				]
			},
			{
				log: 'ReactJS + MUI travel advisor website',
				subLogs: [
					'Card / CardMedia / CardContent / CardActions',
					'Chip: Compact elements that represent an input, attribute, or action'
				]
			},
		]
	},
	{
		date: '03/31/2022',
		subjects: ['ReactJS', 'Material-UI'],
		content: [
			{
				log: 'ReactJS + MUI Study log web app project',
				subLogs: [
					'Complete left drawer and header',
					'Apply responsive design using breakpoints',
					'Add study log view using MUI Grid, Accordion, and List components'
				]
			},
			{
				log: 'OpenCV Study',
				subLogs: [
					'Mat class',
					'Dnn.blobFromImage: preprocessing / preparing theme',
					'net.forward()'
				]
			},
			{
				log: 'OpenCV + Dlib',
				subLogs: [
					'Build opencv and dlib in Android using cmake',
					'Face detection and visualization'
				]
			}
		]
	},
	{
		date: '04/01/2022',
		subjects: ['ReactJS', 'Material-UI'],
		content: [
			{
				log: 'ReactJS + MUI Study log web app project',
				subLogs: [
					'Complete left drawer and header',
					'Apply responsive design using breakpoints',
					'Add study log view using MUI Grid, Accordion, and List components'
				]
			},
			{
				log: 'OpenCV Study',
				subLogs: [
					'Mat class',
					'Dnn.blobFromImage: preprocessing / preparing theme',
					'net.forward()'
				]
			},
			{
				log: 'OpenCV + Dlib',
				subLogs: [
					'Build opencv and dlib in Android using cmake',
					'Face detection and visualization'
				]
			}
		]
	},
	{
		date: '04/02/2022',
		subjects: ['ReactJS', 'Material-UI'],
		content: [
			{
				log: 'ReactJS + MUI Study log web app project',
				subLogs: [
					'Complete left drawer and header',
					'Apply responsive design using breakpoints',
					'Add study log view using MUI Grid, Accordion, and List components'
				]
			},
			{
				log: 'OpenCV Study',
				subLogs: [
					'Mat class',
					'Dnn.blobFromImage: preprocessing / preparing theme',
					'net.forward()'
				]
			},
			{
				log: 'OpenCV + Dlib',
				subLogs: [
					'Build opencv and dlib in Android using cmake',
					'Face detection and visualization'
				]
			}
		]
	},
	{
		date: '04/03/2022',
		subjects: ['ReactJS', 'Material-UI'],
		content: [
			{
				log: 'ReactJS + MUI Study log web app project',
				subLogs: [
					'Complete left drawer and header',
					'Apply responsive design using breakpoints',
					'Add study log view using MUI Grid, Accordion, and List components'
				]
			},
			{
				log: 'OpenCV Study',
				subLogs: [
					'Mat class',
					'Dnn.blobFromImage: preprocessing / preparing theme',
					'net.forward()'
				]
			},
			{
				log: 'OpenCV + Dlib',
				subLogs: [
					'Build opencv and dlib in Android using cmake',
					'Face detection and visualization'
				]
			}
		]
	},
	{
		date: '04/04/2022',
		subjects: ['ReactJS', 'Material-UI'],
		content: [
			{
				log: 'ReactJS + MUI Study log web app project',
				subLogs: [
					'Complete left drawer and header',
					'Apply responsive design using breakpoints',
					'Add study log view using MUI Grid, Accordion, and List components'
				]
			},
			{
				log: 'OpenCV Study',
				subLogs: [
					'Mat class',
					'Dnn.blobFromImage: preprocessing / preparing theme',
					'net.forward()'
				]
			},
			{
				log: 'OpenCV + Dlib',
				subLogs: [
					'Build opencv and dlib in Android using cmake',
					'Face detection and visualization'
				]
			}
		]
	},
	{
		date: '04/05/2022',
		subjects: ['ReactJS', 'Material-UI'],
		content: [
			{
				log: 'ReactJS + MUI Study log web app project',
				subLogs: [
					'Complete left drawer and header',
					'Apply responsive design using breakpoints',
					'Add study log view using MUI Grid, Accordion, and List components'
				]
			},
			{
				log: 'OpenCV Study',
				subLogs: [
					'Mat class',
					'Dnn.blobFromImage: preprocessing / preparing theme',
					'net.forward()'
				]
			},
			{
				log: 'OpenCV + Dlib',
				subLogs: [
					'Build opencv and dlib in Android using cmake',
					'Face detection and visualization'
				]
			}
		]
	},
	{
		date: '04/06/2022',
		subjects: ['ReactJS', 'Material-UI'],
		content: [
			{
				log: 'ReactJS + MUI Study log web app project',
				subLogs: [
					'Complete left drawer and header',
					'Apply responsive design using breakpoints',
					'Add study log view using MUI Grid, Accordion, and List components'
				]
			},
			{
				log: 'OpenCV Study',
				subLogs: [
					'Mat class',
					'Dnn.blobFromImage: preprocessing / preparing theme',
					'net.forward()'
				]
			},
			{
				log: 'OpenCV + Dlib',
				subLogs: [
					'Build opencv and dlib in Android using cmake',
					'Face detection and visualization'
				]
			}
		]
	}
];

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

const Content = () => {
	const [dialogOpen, setDialogOpen] = useState(false);

	const [refDict, setRefDict] = useState({});

	useEffect(() => {
		for (const { date } of data) {
			const newRef = createRef();
			setRefDict((prevRefDict) => ({...prevRefDict, [date]: newRef}));
		}
	}, [data]);

	const minDate = useMemo(() => (data.length ? new Date(data[0].date) : new Date()), [data]);

	const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const onDateChange = (date) => {
  	const formattedDate = date.toLocaleDateString('en-us', {month: '2-digit', day: '2-digit', year: 'numeric'});
  	refDict[formattedDate]?.current?.scrollIntoView({block: 'start', behavior: 'smooth'});
  };

  const shouldDisableDate = (date) => {
  	const formattedDate = date.toLocaleDateString('en-us', {month: '2-digit', day: '2-digit', year: 'numeric'});
  	return !(formattedDate in refDict);
  }

	return (
		<Box sx = {{ ml: [0, `${drawerWidth}px`], overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
			<Grid container spacing = {2} sx = {{ p: 3 }}>
				<Grid item xs = {12} smd = {6} lg = {4}>
					<StyledButton onClick = {handleClickOpen}>
						<Box display = "flex" sx = {{ alignItems: 'center' }} >
							<CalendarMonthOutlinedIcon sx = {{ mr: 2, fontSize: 20 }} />
							Select Date
						</Box>
					</StyledButton>
				</Grid>
				<Grid item xs = {12} smd = {6} lg = {4}>
					<StyledButton>
						<Box display = "flex" sx = {{ alignItems: 'center' }}>
							<PsychologyOutlinedIcon sx = {{ mr: 2, fontSize: 20 }} />
							Select Subject
						</Box>
					</StyledButton>
				</Grid>
			</Grid>
			<Box sx = {{ overflow: 'auto' }}>		
				<Grid container spacing = {2} sx = {{ px: 3, pb: 3 }}>
					{
						data.map((dailyData) => (
							<Grid ref = {refDict[dailyData.date]} key = {dailyData.date} item xs = {12} smd = {6} lg = {4}>
								<StudyLog data = {dailyData} />
							</Grid> 
						))
					}
				</Grid>
			</Box>
			<DatePickerDialog open = {dialogOpen} onClose = {handleClose} onDateChange = {onDateChange} shouldDisableDate = {shouldDisableDate} minDate = {minDate}/>
		</Box>
	);
};

export default Content;