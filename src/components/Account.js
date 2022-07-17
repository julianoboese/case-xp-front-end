import { LoadingButton } from '@mui/lab';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { deposit, withdraw } from '../services/account';

export default function Account() {
  const { setIsActionOpen, balance, setBalance } = useContext(AppContext);

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

    setBalance(response.balance);

    setIsLoading(false);
    setIsActionOpen(false);
  };

  return (
    <Paper
      component="form"
      sx={{
        m: 5,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <Box
        sx={{
          my: 2,
          px: 2,
          display: 'flex',
          height: 240,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography>Saldo em conta:</Typography>
        <Typography variant="h7" color='primary' sx={{ fontWeight: 'bold' }}>R$ {balance}</Typography>
      </Box>
      <TextField
        margin="normal"
        required
        fullWidth
        id="account"
        label="Digite o valor"
        name="account"
        autoComplete="account"
        onChange={(event) => setAmount(event.target.value)}
      />

      <Box
        sx={{
          my: 2,
          px: 2,
          display: 'flex',
          height: 240,
          justifyContent: 'space-between',
        }}
      >
        {isLoading ? (
          <LoadingButton loading fullWidth variant="contained" />
        ) : (
          <>
            <Button
              type="submit"
              variant="contained"
              id='deposit'
              onClick={handleSubmit}
            >
              Depositar
            </Button>
            <Button
              color="neutral"
              type="submit"
              variant="contained"
              id='withdraw'
              onClick={handleSubmit}
            >
              Retirar
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
}
