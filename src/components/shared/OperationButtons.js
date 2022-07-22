import React from 'react';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import OperationBox from './OperationBox';

function OperationButtons(props) {
  return (
    <OperationBox>
      {props.isLoading ? (
        <LoadingButton loading fullWidth variant="contained">
          Confirmando...
        </LoadingButton>
      ) : (
        <>
          <Button
            type="submit"
            variant="contained"
            id={props.firstId}
            disabled={props.firstDisabled}
            onClick={props.handleSubmit}
          >
            {props.firstText}
          </Button>
          <Button
            color="neutral"
            type="submit"
            variant="contained"
            id={props.secondId}
            disabled={props.secondDisabled}
            onClick={props.handleSubmit}
          >
            {props.secondText}
          </Button>
        </>
      )}
    </OperationBox>
  );
}

OperationButtons.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  firstId: PropTypes.string.isRequired,
  firstDisabled: PropTypes.bool.isRequired,
  firstText: PropTypes.string.isRequired,
  secondId: PropTypes.string.isRequired,
  secondDisabled: PropTypes.bool.isRequired,
  secondText: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default OperationButtons;
