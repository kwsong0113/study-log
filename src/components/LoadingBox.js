import React from 'react';
import { keyframes } from '@emotion/react';

import Box from '@mui/material/Box';

const rectRotate = keyframes`
  0% {
    transform: rotate(0);
  },
  50%, 100% {
    transform: rotate(180deg);
  }
`;

const fillRect = keyframes`
  0%, 50% {
    height: 0
  }
  100% {
    height: inherit;
  }
`;

const LoadingBox = ({ message }) => {
  return (
    <Box sx = {{ width: 1.0, height: 1.0, flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx = {{
        height: 48,
        width: 48,
        position: 'relative',
        border: '4px solid',
        borderColor: 'primary.main',
        display: 'inline-block',
        animation: `${rectRotate} 1s linear infinite`,
        boxSizing: 'content-box',
        '&::after': {
          content: '""',
          height: 0,
          width: 'inherit',
          display: 'block',
          bgcolor: 'primary.light',
          animation: `${fillRect} 1s linear infinite`,
        }
       }} />
    </Box>
  );
};

export default LoadingBox;