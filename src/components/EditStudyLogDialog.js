import React, { useEffect, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import StudyLog from './StudyLog';

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

const EditStudyLogDialog = ({ data: { id, date, contents }, open, onClose }) => {
  const [text, setText] = useState('');
  const [convertedContents, setConvertedContents] = useState([]);

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
      sx = {{ '& .MuiDialog-paper': { maxWidth: { xs: 500, lg: 800 }, width: { lg: 800 }, bgcolor: 'background.default' } }}
		>
      <Box sx = {{ p: 2 }}>
        <Box sx = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant = "subtitle2" gutterBottom sx = {{ fontWeight: 'bold' }}>Study Log Editor</Typography>
          <IconButton>
            <SaveOutlinedIcon fontSize = "small" />
          </IconButton>
        </Box>
        <Grid container spacing = {2}>
          <Grid item xs = {12} lg = {6}>
            <Typography variant = "body2" gutterBottom align = "center" sx = {{ fontWeight: 'bold'}}>Editor</Typography>
              <TextField fullWidth multiline sx = {{ wordBreak: 'break-all', '& .MuiInputBase-input': { fontSize: 12 } }} rows = {11} value = {text} onChange = {(event) => setText(event.target.value)} onKeyDown = {handleKeyDown} />
          </Grid>
          <Grid item xs = {12} lg = {6}>
            <Typography variant = "body2" gutterBottom align = "center" sx = {{ fontWeight: 'bold'}}>Preview</Typography>
            <Box sx = {{ overflowY: 'auto', height: 286, }}>
              <StudyLog data = {{ id, date, contents: convertedContents }} editable = {false} defaultExpanded = { true }/>
            </Box>
          </Grid>
        </Grid>
        </Box>
		</Dialog>
	);
};

export default EditStudyLogDialog;