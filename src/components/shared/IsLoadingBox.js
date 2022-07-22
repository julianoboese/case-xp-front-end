import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export default function IsLoadingBox() {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) => theme.palette.grey[900],
        height: '250px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
