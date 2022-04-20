import React from 'react';

import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

const SubjectSelectorDialog = ({ subjects, subject, setSubject, open, onClose}) => {
  return (
    <Dialog
			open = {open}
			onClose = {onClose}
      sx = {{ '& .MuiDialog-paper': { bgcolor: 'background.default' } }}
		>
       <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <Select
            value = {subject}
            displayEmpty
            onChange = {(event) => { setSubject(event.target.value); onClose(); }}
          >
            <MenuItem value = ''>All</MenuItem>
            {
              subjects.map((subject) => (
                <MenuItem key = {subject} value = {subject}>{subject}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Box>
    </Dialog>
  )
};

export default SubjectSelectorDialog;