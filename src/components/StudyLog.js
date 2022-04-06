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

const StudyLog = ({ data: { date, subjects, content } }) => {
	const [expanded, setExpanded] = useState(new Array(content.length).fill(false));

	const [allExpanded, setAllExpanded] = useState(false);

	useEffect(() => setAllExpanded(expanded.every((value) => value)), [expanded]);

	const handleExpandToggle = () => {
		if (allExpanded) {
			setExpanded(new Array(content.length).fill(false));
		} else {
			setExpanded(new Array(content.length).fill(true));
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
		      		{date}
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
	      			subjects.map((subject, index) => (
	      					<Chip key = {index} label = {subject} size = "small" variant = "outlined" sx = {{
	      						fontSize: 10, mr: 0.5, borderColor: 'border.main'
	      					}}/>
      					)
      				)
	      		}
	      	</>
	      }
	    />
	    <CardContent sx = {{ p: 0, '&:last-child': { pb: 0 } }}>
	      <StudyLogContent content = {content} expanded = {expanded} setExpanded = {setExpanded} />
	    </CardContent>
    </Card>
	);
};

export default StudyLog;