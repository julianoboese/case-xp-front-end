import { LoadingButton } from '@mui/lab';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { deposit, withdraw } from '../services/account';

export default function Account() {
  const { setIsActionOpen, balance } = useContext(AppContext);

  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (event.target.id === 'deposit') {
      await deposit({ amount: Number(amount) });
    } else {
      await withdraw({ amount: Number(amount) });
    }

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
        }}
      >
        <Typography>Saldo em conta:</Typography>
        <Typography>R$ {balance}</Typography>
      </Box>
      <TextField
        margin="normal"
        required
        fullWidth
        id="account"
        label="Digite o valor"
        name="account"
        autoComplete="account"
        autoFocus
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
