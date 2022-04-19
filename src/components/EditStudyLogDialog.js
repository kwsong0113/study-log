import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import StudyLog from './StudyLog';
import { UserDataContext } from './UserDataProvider';
import { StudyLogPageContext } from '../pages/StudyLogPage';

const domain = process.env.REACT_APP_API_DOMAIN;

const studyLogExample = "# Web Development # Frontend\n\t+ Basics of HTML, CSS, and Javascript\n\t\t- HTML: provides the basic structure\n\t\t- CSS: used to control layout\n\t\t- Javascript: used to control the behavior of different elements";

const StyledTypography = ({ children, ...props}) => (
  <Typography {...props} variant = "body2" gutterBottom sx = {{ fontSize: 11, textIndent: -11, pl: '11px', mb: 1 }}>{'# ' + children}</Typography>
) ;

const textToContents = (text) => {
  const resultContents = [];

  const splitText = text.split('\n').map((line) => line.trim());
  splitText.forEach((line) => {
    switch (line[0]) {
      case '#':
        resultContents.push({ subjects: line.split('#').map((subject) => subject.trim()).filter((subject) => subject), logs: []});
        break;
      case '+':
        if (resultContents.length > 0) {
          resultContents[resultContents.length - 1].logs.push({
            log: line.slice(1).trim(),
            subLogs: [],
          })
        }
        break;
      case '-':
        if (resultContents.length > 0 && resultContents[resultContents.length -1].logs.length > 0) {
          resultContents[resultContents.length - 1].logs[resultContents[resultContents.length -1].logs.length - 1].subLogs.push(line.slice(1).trim());
        }
        break;
      default:
        break;
    }
  });
  return resultContents;
}

const contentsToText = (contents) => {
  const textArray = [];
  contents.forEach(({ subjects, logs }) => {
    textArray.push(subjects.map((subject) => '# ' + subject).join(' '));
    logs.forEach(({ log, subLogs }) => {
      textArray.push('\t+ ' + log);
      subLogs.forEach((subLog) => textArray.push('\t\t- ' + subLog));
    });
  });
  return textArray.join('\n');
}


const EditStudyLogDialog = ({ addMode, data: { _id, date, contents }, open, onClose }) => {
  const { username } = useContext(UserDataContext);
  const { refreshData, setIsLoading, showSnackbar } = useContext(StudyLogPageContext);
  const [text, setText] = useState('');
  const [convertedContents, setConvertedContents] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const startLoading = () => setIsLoading((previousIsLoading) => previousIsLoading + 1);
  const nextLoading = () => {
    setIsLoading((previousIsLoading) => previousIsLoading - 1);
    refreshData();
  };

  const updateStudyLog = () => {
    onClose();
    startLoading();
    axios.post(`${domain}/studylogs/${username}`, { _id, contents: convertedContents })
      .then(() => {
        nextLoading();
        showSnackbar("success", "Update Successful")
      })
      .catch((err) => {
        nextLoading();
        showSnackbar("error", "Update Failed")
      });
  };

  const addStudyLog = () => {
    onClose();
    startLoading();
    axios.post(`${domain}/studylogs/${username}`, { date, contents: convertedContents })
      .then(() => {
        nextLoading();
        showSnackbar("success", "Upload Successful")
      })
      .catch((err) => {
        nextLoading();
        showSnackbar("error", "Upload Failed")
      })
  };

  const deleteStudyLog = () => {
    startLoading();
    axios.delete(`${domain}/studylogs/${username}`, { data: { username, _id } })
      .then(() => {
        nextLoading();
        showSnackbar("success", "Delete Successful")
      })
      .catch((err) => {
        nextLoading();
        showSnackbar("error", "Delete Failed")
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const value = event.target.value;
      const selectionStart = event.target.selectionStart;
      let selectionEnd = event.target.selectionEnd;
      let lineBreakException = 0;
      if (selectionStart < selectionEnd && value[selectionEnd - 1] === '\n') {
        lineBreakException = 1;
        selectionEnd--;
      }
      let beforeStart = value.slice(0, selectionStart);
      const splitBetweenStartAndEnd = value.slice(selectionStart, selectionEnd).split('\n');
      if (!event.shiftKey) {
        const indexOfNewline = beforeStart.lastIndexOf('\n');
        event.target.value = beforeStart.slice(0, indexOfNewline + 1) + '\t' + beforeStart.slice(indexOfNewline + 1) + splitBetweenStartAndEnd.join('\n\t') + value.slice(selectionEnd);
        event.target.selectionStart = selectionStart + 1;
        event.target.selectionEnd = selectionEnd + splitBetweenStartAndEnd.length + lineBreakException;
      } else {
        let beforeCount = 0;
        let betweenCount = 0;
        const indexOfTab = beforeStart.lastIndexOf('\t');
        const indexOfNewline = beforeStart.lastIndexOf('\n');
        if (indexOfTab !== -1 && indexOfTab > indexOfNewline) {
          beforeStart = beforeStart.slice(0, indexOfTab) + beforeStart.slice(indexOfTab + 1);
          event.target.selectionStart = selectionStart - 1;
          beforeCount = 1;
        }
        event.target.value = beforeStart + splitBetweenStartAndEnd.map((line, index) => {
          if (index === 0) { return line; }
          const indexOfTab = line.indexOf('\t');
          if (indexOfTab !== -1) {
            betweenCount++;
            return line.slice(0, indexOfTab) + line.slice(indexOfTab + 1);
          }
          return line;
        }).join('\n') + value.slice(selectionEnd);
        event.target.selectionStart = selectionStart - beforeCount;
        event.target.selectionEnd = selectionEnd - beforeCount - betweenCount + lineBreakException;
      }
    }
  }
  

  useEffect(() => {
    setText(contentsToText(contents));
  }, [contents]);

  useEffect(() => {
    setConvertedContents(textToContents(text));
  }, [text]);


	 return (
		<Dialog
			open = {open}
			onClose = {onClose}
      sx = {{ '& .MuiDialog-paper': { maxWidth: { xs: 500, lg: 800 }, width: { xs: 500, lg: 800 }, bgcolor: 'background.default' } }}
		>
      <Box sx = {{ p: 2 }}>
        <Box sx = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant = "subtitle2" gutterBottom sx = {{ fontWeight: 'bold' }}>Study Log Editor</Typography>
          <Box sx = {{ display: 'flex', alignItems: 'center'}}>
            {!addMode && (
                <IconButton onClick = {() => deleteStudyLog()}>
                  <DeleteOutlineOutlinedIcon fontSize = "small" />
                </IconButton>
              )
            }
            <IconButton onClick = {() => (addMode ? addStudyLog : updateStudyLog)()}>
              <PublishedWithChangesOutlinedIcon fontSize = "small" />
            </IconButton>
            <IconButton onClick = {(event) => setAnchorEl(event.currentTarget)}>
              <HelpOutlineOutlinedIcon fontSize = "small" />
            </IconButton>
            <Popover
              open = {Boolean(anchorEl)}
              anchorEl = {anchorEl}
              onClose = {() => setAnchorEl(null)}
              anchorOrigin = {{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin = {{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <Box sx = {{ maxWidth: 300, p: 2, bgcolor: 'background.default' }}>
                <Typography variant = "subtitle2" color = "primary" gutterBottom sx = {{ fontSize: 13, mb: 1 }}>How to use the study log editor</Typography>
                <StyledTypography>To denote a subject, add a number sign (#) before it (e.g., # Mathematics).</StyledTypography>
                <StyledTypography>If you want to write about multiple subjects, list them in one line (e.g., # Linear Algebra # Calculus)</StyledTypography>
                <StyledTypography>To create a log, add a plus sign (+) before it</StyledTypography>
                <StyledTypography>To create a sublog, add a minus sign (-) before it</StyledTypography>
                <StyledTypography>Indentation (optional): You are recommended to indent logs and double indent sublogs.</StyledTypography>
                <StyledTypography>Indent: Tab, Reverse Indent: Shift + Tab</StyledTypography>
                <Typography variant = "subtitle2" color = "primary" gutterBottom sx = {{ fontSize: 13, my: 1 }}>Example</Typography>
                <Box>
                  <TextField fullWidth  multiline sx = {{ wordBreak: 'break-all', '& .MuiInputBase-input': { fontSize: 11 } }} value = {studyLogExample} />
                </Box>
              </Box>
            </Popover>
            <IconButton onClick = {onClose}>
              <CloseOutlinedIcon fontSize = "small" />
            </IconButton>
          </Box>
        </Box>
        <Grid container spacing = {2}>
          <Grid item xs = {12} lg = {6}>
            <Typography variant = "body2" gutterBottom align = "center" sx = {{ fontWeight: 'bold'}}>Editor</Typography>
              <TextField fullWidth multiline sx = {{ wordBreak: 'break-all', '& .MuiInputBase-input': { fontSize: 12 } }} rows = {11} value = {text} onChange = {(event) => setText(event.target.value)} onKeyDown = {handleKeyDown} />
          </Grid>
          <Grid item xs = {12} lg = {6}>
            <Typography variant = "body2" gutterBottom align = "center" sx = {{ fontWeight: 'bold'}}>Preview</Typography>
            <Box sx = {{ overflowY: 'auto', height: 286, }}>
              <StudyLog data = {{ _id, date, contents: convertedContents }} editable = {false} defaultExpanded = { true }/>
            </Box>
          </Grid>
        </Grid>
        </Box>
		</Dialog>
	);
};

export default EditStudyLogDialog;