import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export default function OperationBox(props) {
  return (
    <Box
      sx={{
        my: props.my,
        px: props.px,
        height: props.height,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {props.children}
    </Box>
  );
}

OperationBox.defaultProps = {
  my: 2,
  px: 1,
  height: 240,
};

OperationBox.propTypes = {
  my: PropTypes.number,
  px: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node,
};
