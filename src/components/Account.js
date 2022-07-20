import { LoadingButton } from '@mui/lab';
import { Button, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { deposit, withdraw } from '../services/account';
import { formatMoney } from '../utils/format';
import OperationBox from './OperationBox';

export default function Account() {
  const { setIsActionOpen, balance, setBalance, setCurrentOperation } = useContext(AppContext);

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

    setBalance(formatMoney(response.balance));
    setIsLoading(false);
    setIsActionOpen(false);
    setCurrentOperation('');
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
        onChange={(event) => setAmount(event.target.value)}
      />

      <OperationBox>
        {isLoading ? (
          <LoadingButton loading fullWidth variant="contained">
            Confirmando...
          </LoadingButton>
        ) : (
          <>
            <Button
              type="submit"
              variant="contained"
              id="deposit"
              onClick={handleSubmit}
            >
              Depositar
            </Button>
            <Button
              color="neutral"
              type="submit"
              variant="contained"
              id="withdraw"
              disabled={balance < amount}
              onClick={handleSubmit}
            >
              Retirar
            </Button>
          </>
        )}
      </OperationBox>
    </Paper>
  );
}
