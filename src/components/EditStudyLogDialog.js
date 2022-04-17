import React, { useEffect, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

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
  console.log(textArray);
  return textArray.join('\n');
}

const EditStudyLogDialog = ({ data: { id, date, contents }, open, onClose }) => {
  const [text, setText] = useState('');
  const [convertedContents, setConvertedContents] = useState([]);

  useEffect(() => {
    console.log(contents);
    setText(contentsToText(contents));
  }, [contents]);

  useEffect(() => {
    setConvertedContents(textToContents(text));
  }, [text]);

	 return (
		<Dialog
			open = {open}
			onClose = {onClose}
      fullScreen
		>
			<Grid container spacing = {2} sx = {{ height: 1.0 }}>
        <Grid item xs = {12} lg = {6}>
          <TextField fullWidth multiline sx = {{ height: 1.0, '& .MuiInputBase-root': { bgcolor: 'lightblue', height: 1.0 } }} value = {text} onChange = {(event) => setText(event.target.value)} />
        </Grid>
        <Grid item xs = {12} md = {6}>
          <StudyLog data = {{ id, date, contents: convertedContents }} editable = {false} />
        </Grid>
      </Grid>
		</Dialog>
	);
};

export default EditStudyLogDialog;