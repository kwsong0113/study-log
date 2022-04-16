import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import StudyLogContent from './StudyLogContent';

const StudyLog = ({ data: { date, contents } }) => {
	const [expanded, setExpanded] = useState([]);

	const [allExpanded, setAllExpanded] = useState(false);

	useEffect(() => {
		const updateExpanded = async () => {
			await setExpanded(contents.map(({ logs }) => new Array(logs.length).fill(false)));
		}

		updateExpanded();
	}, [contents]);

	useEffect(() => setAllExpanded(expanded.every((row) => row.every((value) => value))), [expanded]);

	const handleExpandToggle = () => {
		if (allExpanded) {
			setExpanded((previousExpanded) => previousExpanded.map((row) => new Array(row.length).fill(false)));
		} else {
			setExpanded((previousExpanded) => previousExpanded.map((row) => new Array(row.length).fill(true)));
		}
	}

	return (
		<Card
			elevation = {0}
			sx = {{
				bgcolor: 'background.default',
				// boxShadow: 'none',
				border: '1px solid',
				borderColor: 'border.main',
			}}
		>
			<CardHeader
				sx = {{
					py: 1.5,
					bgcolor: '#AAA2',
				}}
				disableTypography
	      action={
	      	<>
		      	
	        </>
	      }
	      title={
	      	<Box sx = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
		      	<Typography variant = "caption" fontSize = {16} sx = {{ ml: 1 }}>
		      		{new Date(date).toLocaleDateString('en-us', {month: '2-digit', day: '2-digit', year: 'numeric'})}
	      		</Typography>
	      		<Box display = "inline">
		      		<IconButton>
			          <EditOutlinedIcon fontSize = "small"/>
			        </IconButton>
			        <IconButton onClick = {handleExpandToggle}>
			          {allExpanded ? <ExpandLessIcon fontSize = "small" /> : <ExpandMoreIcon fontSize = "small" />}
			        </IconButton>
		        </Box>
	        </Box>
    		}
	      subheader={
	      	<>
						{
							contents.map(({ subjects }, index) => (
								<Chip key = {index} label = {subjects.join(' + ')} size = "small" variant = "outlined" sx = {{
									fontSize: 10, mr: 0.5, borderColor: 'border.main'
								}}/>
							))
						}
	      	</>
	      }
	    />
	    <CardContent sx = {{ p: 0, '&:last-child': { pb: 0 } }}>
	      <StudyLogContent contents = {contents} expanded = {expanded} setExpanded = {setExpanded} />
	    </CardContent>
    </Card>
	);
};

export default StudyLog;