import React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { styled } from '@mui/material/styles';


const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation = {0} square {...props} />
))(({ theme }) => ({
	// border: `1px solid ${theme.palette.divider}`,
	backgroundColor: theme.palette.background.default,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: 10 }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  flexDirection: 'row-reverse',
  // padding: `${theme.spacing(1)},
  minHeight: 0,	
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: `${theme.spacing(1)} ${theme.spacing(2)} ${theme.spacing(1)} ${theme.spacing(4)}`,
  backgroundColor: '#AAA2'
}));

const StudyLogContent = ({ content, expanded, setExpanded }) => {

  const handleChange = (index) => (event, newExpanded) => {
    setExpanded((previousExpanded) => [...previousExpanded.slice(0, index), newExpanded, ...previousExpanded.slice(index + 1)]);
  };

  return (
    <Box>
    	{
    		content.map(({ log, subLogs }, logIndex) => (
    			<Accordion key = {logIndex} expanded={expanded[logIndex]} onChange={handleChange(logIndex)}>
    				<AccordionSummary>
    					<Typography sx = {{ fontSize: 12,  wordBreak: 'break-word'}}>
    						{log}
         			</Typography>
       			</AccordionSummary>
       			<AccordionDetails>
     					<List sx = {{ p: 0 }}>
     						{
     							subLogs.map((subLog, subLogIndex) => (
     								<ListItem key = {subLogIndex} sx = {{ p: 0, alignItems: 'flex-start' }}>
				          		<ListItemIcon sx = {{ minWidth: 0, mr: 1, mt: 0.5 }}>
				          			<CircleOutlinedIcon sx = {{ fontSize: 7 }}/>
				        			</ListItemIcon>
				        			<ListItemText primary = {subLog} sx = {{ m: 0, '& .MuiListItemText-primary': {fontSize: 10} }}/>
				      			</ListItem>
   								))
     						}
   						</List>
 						</AccordionDetails>
					</Accordion>
  			))
    	}
  	</Box>
  );
}

export default StudyLogContent;