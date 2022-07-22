import React, { useContext } from 'react';
import { Alert, Grow } from '@mui/material';
import AppContext from '../context/AppContext';

function ErrorMessage() {
  const { errorMessage } = useContext(AppContext);
  return (
    <>
      {errorMessage && (
        <Grow in={errorMessage}>
          <Alert variant="filled" severity="error" sx={{ m: 1 }}>
            {errorMessage}
          </Alert>
        </Grow>
      )}
    </>
  );
}

export default ErrorMessage;
