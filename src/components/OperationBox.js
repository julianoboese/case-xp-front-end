import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

function OperationBox(props) {
  return (
    <Box
      sx={{
        my: 2,
        px: 1,
        height: 240,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {props.children}
    </Box>
  );
}

OperationBox.propTypes = {
  children: PropTypes.node,
};

export default OperationBox;
