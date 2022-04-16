import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ErrorMessage = ({ message }) => {
  return (
    <Box sx = {{ width: 1.0, height: 1.0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant = "body1" sx = {{ fontWeight: 'light' }}>
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;