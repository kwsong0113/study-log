import React, { useState, useEffect, useMemo, createRef, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import StudyLog from '../components/StudyLog';
import DatePickerDialog from '../components/DatePickerDialog';
import { UserDataContext } from '../components/UserDataProvider';
import ErrorMessage from '../components/ErrorMessage';
import LoadingBox from '../components/LoadingBox';
import EditStudyLogDialog from '../components/EditStudyLogDialog';
import SubjectSelectorDialog from '../components/SubjectSelectorDialog';

export const StudyLogPageContext = React.createContext({});

const domain = process.env.REACT_APP_API_DOMAIN;

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

const getTodayISOString = () => {
	const today = new Date();
	return new Date(new Date(today.toLocaleDateString()).getTime() - today.getTimezoneOffset() * 60000).toISOString();
}

const StudyLogPage = () => {
	const { username: targetUsername } = useParams();
	const { username: loggedInUsername } = useContext(UserDataContext);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(0);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editorOpen, setEditorOpen] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [subjectSelectorOpen, setSubjectSelectorOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');
	const [subject, setSubject] = useState('');
	const [subjectList, setSubjectList] = useState([]);
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [refDict, setRefDict] = useState({});
	const [todayExist, setTodayExist] = useState(false);

	const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
	
	const refreshData = () => {
		setIsLoading((previousIsLoading) => previousIsLoading + 1);
		axios.get(`${domain}/studylogs/${targetUsername}`)
			.then((response) => {
				setData((response.data));
				setSubject('');
				setIsError(false);
				setIsLoading((previousIsLoading) => previousIsLoading - 1);
			})
			.catch((error) => {
				setIsError(true);
				setIsLoading((previousIsLoading) => previousIsLoading - 1);
			});
	};

	const showSnackbar = (severity, message) => {
		setSnackbarSeverity(severity);
		setSnackbarMessage(message);
		setSnackbarOpen(true);
	}

	useEffect(() => {
		refreshData();
	}, [targetUsername]);

	useEffect(() => {
		const updateSubjectList = async () => {
			const subjectSet = new Set();
			data.forEach(({ contents }) => {
				contents.forEach(({ subjects }) => subjects.forEach((subject) => subjectSet.add(subject)));
			});
			setSubjectList(Array.from(subjectSet));
		}
		updateSubjectList();
	}, [data])
		
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
		const today = getTodayISOString();
		setTodayExist(data.some(({ date }) => date === today));
	}, [data, subject]);

	useEffect(() => {
		setRefDict({});
		for (const { date } of filteredData) {
			const newRef = createRef();
			setRefDict((prevRefDict) => ({...prevRefDict, [date]: newRef}));
		}
	}, [filteredData]);

	const minDate = useMemo(() => (filteredData.length ? new Date(filteredData[0].date) : new Date()), [filteredData]);

	const formatDate = (date) => {
		return new Date(date.getTime() - 60000 * date.getTimezoneOffset()).toISOString();
	}

  const onDateChange = (date) => {
  	refDict[formatDate(date)]?.current?.scrollIntoView({block: 'start', behavior: 'smooth'});
  };

  const shouldDisableDate = (date) => {
  	return !(formatDate(date) in refDict);
  }

	if (isLoading > 0) {
		return <LoadingBox />
	}

	if (isError) {
		return <ErrorMessage message = "User not found" />;
	}

	return (
		<StudyLogPageContext.Provider value ={{ refreshData, setIsLoading, showSnackbar }}>
			<Grid container spacing = {2} sx = {{ p: 3 }}>
				<Grid item xs = {12} smd = {6} lg = {4} xl = {3}>
					<StyledButton onClick = {() => setDialogOpen(true)}>
						<Box display = "flex" sx = {{ alignItems: 'center' }} >
							<CalendarMonthOutlinedIcon sx = {{ mr: 2, fontSize: 20 }} />
							Select Date
						</Box>
					</StyledButton>
				</Grid>
				<Grid item xs = {12} smd = {6} lg = {4} xl = {3}>
					<StyledButton onClick = {() => setSubjectSelectorOpen(true)}>
						<Box display = "flex" sx = {{ alignItems: 'center' }}>
							<PsychologyOutlinedIcon sx = {{ mr: 2, fontSize: 20 }} />
							Select Subject
						</Box>
					</StyledButton>
				</Grid>
				<Grid item lg = {4} xl = {3} sx = {{ display: loggedInUsername === targetUsername && !todayExist ? {xs: 'none', lg: 'block'} : 'none' }}>
					<StyledButton onClick = {() => setEditorOpen(true)}>
						<Box display = "flex" sx = {{ alignItems: 'center' }}>
							<AddOutlinedIcon sx = {{ mr: 2, fontSize: 20 }} />
							New Study Log
						</Box>
					</StyledButton>
				</Grid>
			</Grid>
			<Box sx = {{ overflowY: 'auto' }}>		
				<Grid container spacing = {2} sx = {{ px: 3, pb: 3 }}>
					{
						filteredData.map((dailyData) => (
							<Grid ref = {refDict[dailyData.date]} key = {dailyData.date} item xs = {12} smd = {6} lg = {4} xl = {3}>
								<StudyLog data = {dailyData} editable = {(subject === '') && (loggedInUsername === targetUsername)} defaultExpanded = {false} />
							</Grid> 
						))
					}
				</Grid>
			</Box>
			<Fab size = "medium" color = "primary" onClick = {() => setEditorOpen(true)} sx= {{ display: loggedInUsername === targetUsername && !todayExist ? {xs: 'flex', lg: 'none'} : 'none', position: 'absolute', bottom: 16, right: 24 }}>
				<AddOutlinedIcon fontSize = "small" />
			</Fab>
			<DatePickerDialog open = {dialogOpen} onClose = {() => setDialogOpen(false)} onDateChange = {onDateChange} shouldDisableDate = {shouldDisableDate} minDate = {minDate}/>
			<EditStudyLogDialog addMode = {true} open = {editorOpen} onClose = {() => setEditorOpen(false)} data = {{ date: getTodayISOString(), contents: [] }} />
			<Snackbar open = {snackbarOpen} autoHideDuration = {5000} onClose = {handleSnackbarClose}>
        <Alert onClose = {handleSnackbarClose} severity = {snackbarSeverity} sx = {{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
			<SubjectSelectorDialog subjects = {subjectList} subject = {subject} setSubject = {setSubject} open = {subjectSelectorOpen} onClose = {() => setSubjectSelectorOpen(false)} />
		</StudyLogPageContext.Provider>
	);
};

export default StudyLogPage;