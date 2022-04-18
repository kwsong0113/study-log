import React, { useState, useEffect, useMemo, createRef, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { styled } from '@mui/material/styles';

import StudyLog from '../components/StudyLog';
import DatePickerDialog from '../components/DatePickerDialog';
import { UserDataContext } from '../components/UserDataProvider';
import ErrorMessage from '../components/ErrorMessage';
import LoadingBox from '../components/LoadingBox';

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

const StudyLogPage = () => {
	const { username: targetUsername } = useParams();
	const { username: loggedInUsername } = useContext(UserDataContext);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(0);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [subject, setSubject] = useState(null);
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [refDict, setRefDict] = useState({});

	useEffect(() => {
		setIsLoading((previousIsLoading) => previousIsLoading + 1);
		axios.get(`http://localhost:8000/studylogs/${targetUsername}`)
			.then((response) => {
				setData((response.data));
				setSubject(null);
				setIsError(false);
				setIsLoading((previousIsLoading) => previousIsLoading - 1);
			})
			.catch((error) => {
				setIsError(true);
				setIsLoading((previousIsLoading) => previousIsLoading - 1);
			});
		}, [targetUsername]);
		
	useEffect(() => {
		const updateFilteredContents = async () => {
			setIsLoading((previousIsLoading) => previousIsLoading + 1);
			if (subject) {
				const reducedData = await data.reduce((previous, { contents, ...elseInfo }) => {
					const filteredContents = contents.filter(({ subjects }) => subjects.includes(subject));
					if (filteredContents.length) { return [...previous, { contents: filteredContents, ...elseInfo }]; }
					return previous;
				}, []);
				setFilteredData(reducedData);
				setIsLoading((previousIsLoading) => previousIsLoading - 1);
			} else {
				setFilteredData(data);
				setIsLoading((previousIsLoading) => previousIsLoading - 1);
			}
		}
		updateFilteredContents();		
	}, [data, subject])

	useEffect(() => {
		for (const { date } of filteredData) {
			const newRef = createRef();
			setRefDict((prevRefDict) => ({...prevRefDict, [date]: newRef}));
		}
	}, [filteredData]);

	const minDate = useMemo(() => (filteredData.length ? new Date(filteredData[0].date) : new Date()), [filteredData]);

	const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const onDateChange = (date) => {
  	const formattedDate = date.toISOString();
  	refDict[formattedDate]?.current?.scrollIntoView({block: 'start', behavior: 'smooth'});
  };

  const shouldDisableDate = (date) => {
  	const formattedDate = date.toISOString();
  	return !(formattedDate in refDict);
  }

	if (isLoading > 0) {
		return <LoadingBox />
	}

	if (isError) {
		return <ErrorMessage message = "User not found" />;
	}

	return (
		<>
			<Grid container spacing = {2} sx = {{ p: 3 }}>
				<Grid item xs = {12} smd = {6} lg = {4} xl = {3}>
					<StyledButton onClick = {handleClickOpen}>
						<Box display = "flex" sx = {{ alignItems: 'center' }} >
							<CalendarMonthOutlinedIcon sx = {{ mr: 2, fontSize: 20 }} />
							Select Date
						</Box>
					</StyledButton>
				</Grid>
				<Grid item xs = {12} smd = {6} lg = {4} xl = {3}>
					<StyledButton>
						<Box display = "flex" sx = {{ alignItems: 'center' }}>
							<PsychologyOutlinedIcon sx = {{ mr: 2, fontSize: 20 }} />
							Select Subject
						</Box>
					</StyledButton>
				</Grid>
			</Grid>
			<Box sx = {{ overflowY: 'auto' }}>		
				<Grid container spacing = {2} sx = {{ px: 3, pb: 3 }}>
					{
						filteredData.map((dailyData) => (
							<Grid ref = {refDict[dailyData.date]} key = {dailyData.date} item xs = {12} smd = {6} lg = {4} xl = {3}>
								<StudyLog data = {dailyData} editable = {loggedInUsername === targetUsername} defaultExpanded = {false} />
							</Grid> 
						))
					}
				</Grid>
			</Box>
			<DatePickerDialog open = {dialogOpen} onClose = {handleClose} onDateChange = {onDateChange} shouldDisableDate = {shouldDisableDate} minDate = {minDate}/>
		</>
	);
};

export default StudyLogPage;