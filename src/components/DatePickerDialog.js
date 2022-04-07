import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

const DatePickerDialog = ({ onClose, open, onDateChange, shouldDisableDate, minDate }) => {
	 const [value, setValue] = React.useState(new Date());

	 return (
		<Dialog
			open = {open}
			onClose = {onClose}
			sx = {{ '.MuiPickerStaticWrapper-root, .MuiPickersDay-root': { bgcolor: 'background.default' } }}
		>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
		  <StaticDatePicker
		    displayStaticWrapperAs="desktop"
		    disableFuture
		    openTo="day"
		    views={['year', 'month', 'day']}
		    value={value}
		    onChange={(newValue) => {
		      setValue(newValue);
		      onDateChange(newValue);
		    }}
		    renderInput={(params) => <TextField {...params} />}
		    // minDate = {new Date(2022, 0, 1)}
		    shouldDisableDate = {shouldDisableDate}
		    minDate = {minDate}
		  />
		</LocalizationProvider>
		</Dialog>
	);
};

export default DatePickerDialog;