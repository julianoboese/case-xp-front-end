import React from 'react';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';

function SubmitButton(props) {
  return (
    <>
      {props.isLoading ? (
        <LoadingButton
          loading
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {props.text}
        </LoadingButton>
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={props.handleButtonDisabled()}
          sx={{ mt: 3, mb: 2 }}
        >
          {props.text}
        </Button>
      )}
    </>
  );
}

SubmitButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  handleButtonDisabled: PropTypes.func.isRequired,
};

export default SubmitButton;
