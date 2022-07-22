import { Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { deposit, withdraw } from '../services/account';
import { formatMoney } from '../utils/format';
import ErrorMessage from './shared/ErrorMessage';
import OperationBox from './shared/OperationBox';
import OperationButtons from './shared/OperationButtons';

export default function Account() {
  const {
    setIsActionOpen,
    balance,
    setBalance,
    setCurrentOperation,
    setErrorMessage,
  } = useContext(AppContext);

  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let response;
    if (event.target.id === 'deposit') {
      response = await deposit({ amount: Number(amount) });
    } else {
      response = await withdraw({ amount: Number(amount) });
    }

    if (response.status === 401) {
      history.push('/');
    }

    if (response.status) {
      setIsLoading(false);
      setErrorMessage(response.message);
      return setTimeout(() => setErrorMessage(''), 4000);
    }

    setBalance(response.balance);
    setIsLoading(false);
    setIsActionOpen(false);
    return setCurrentOperation('');
  };

  return (
    <Paper
      component="form"
      sx={{ m: 5, p: 2, display: 'flex', flexDirection: 'column', height: 240 }}
    >
      <OperationBox>
        <Typography>Saldo em conta:</Typography>
        <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
          {formatMoney(balance)}
        </Typography>
      </OperationBox>
      <TextField
        margin="normal"
        required
        fullWidth
        id="account"
        label="Digite o valor"
        name="account"
        inputProps={{ style: { textAlign: 'right' } }}
        value={amount}
        onChange={(event) => {
          if (!Number.isNaN(Number(event.target.value))) {
            setAmount(Math.floor(event.target.value));
          }
        }}
      />
      <OperationButtons
        isLoading={isLoading}
        firstId="deposit"
        firstText="Depositar"
        firstDisabled={amount <= 0}
        secondId="withdraw"
        secondText="Retirar"
        secondDisabled={balance < amount || amount <= 0}
        handleSubmit={handleSubmit}
      />
      <ErrorMessage />
    </Paper>
  );
}
