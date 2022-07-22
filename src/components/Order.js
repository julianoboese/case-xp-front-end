import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grow,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { buyAsset, sellAsset } from '../services/order';
import { formatChange, formatMoney } from '../utils/format';
import OperationBox from './OperationBox';
import Title from './Title';

export default function Order() {
  const {
    setIsActionOpen, currentAsset, setCurrentAsset,
    setCurrentOperation, balance,
  } = useContext(AppContext);

  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let response;
    if (event.target.id === 'buy') {
      response = await buyAsset(currentAsset.assetId, Number(amount), currentAsset.price);
    } else {
      response = await sellAsset(currentAsset.assetId, Number(amount), currentAsset.price);
    }

    if (response.status === 401) {
      history.push('/');
    }

    if (response.status) {
      setIsLoading(false);
      setErrorMessage(response.message);
      return setTimeout(() => setErrorMessage(''), 4000);
    }

    setCurrentAsset({});
    setIsLoading(false);
    setIsActionOpen(false);
    return setCurrentOperation('');
  };

  return (
    <Paper
      component="form"
      sx={{
        m: 5,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 450,
      }}
    >
      <Title>Ordem a mercado</Title>
      <Card
        sx={{
          bgcolor: (theme) => theme.palette.grey[700],
          my: 1,
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          minHeight: '40px',
        }}
      >
        <CardContent sx={{ py: 1, flexGrow: 1 }}>
          <Typography display="inline-block" width="25%">
            Ativo
          </Typography>
          <Typography display="inline-block" width="25%">
            Posição
          </Typography>
          <Typography display="inline-block" width="30%">
            Valor atual
          </Typography>
          <Typography display="inline-block" width="20%">
            Variação
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          bgcolor: (theme) => theme.palette.grey[900],
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          minHeight: '45px',
        }}
      >
        <CardContent sx={{ py: 1, flexGrow: 1 }}>
          <Typography
            color="primary"
            display="inline-block"
            width="30%"
          >
            {currentAsset.ticker}
          </Typography>
          <Typography display="inline-block" width="20%">
            {currentAsset.quantity}
          </Typography>
          <Typography display="inline-block" width="30%">
            {currentAsset.price && formatMoney(currentAsset.price)}
          </Typography>
          <Typography
            color={currentAsset.change >= 0 ? '#66bb6a' : 'error'}
            display="inline-block"
            width="20%"
          >
            {currentAsset.change && formatChange(currentAsset.change)}
          </Typography>
        </CardContent>
      </Card>
      <TextField
        margin="normal"
        required
        fullWidth
        id="order"
        label="Digite a quantidade"
        name="order"
        inputProps={{ style: { textAlign: 'right' } }}
        value={amount}
        onChange={(event) => {
          if (!Number.isNaN(Number(event.target.value))) {
            setAmount(Math.floor(event.target.value));
          }
        }}
      />
      <Box sx={{
        mt: 1,
        px: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography>Poder de compra:</Typography>
        <Typography color={balance < currentAsset.price * amount && 'error'}>
          {formatMoney(balance)}
        </Typography>
      </Box>
      <Box sx={{
        px: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography>Poder de venda:</Typography>
        <Typography color={amount > currentAsset.quantity && 'error'}>
          {formatMoney(currentAsset.quantity * currentAsset.price)}
        </Typography>
      </Box>
      <OperationBox>
        <Typography>Valor total da ordem:</Typography>
        <Typography variant="h5" color='primary' sx={{ fontWeight: 'bold' }}>
          {formatMoney(currentAsset.price * amount || 0)}
        </Typography>
      </OperationBox>
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
              id="buy"
              disabled={balance < currentAsset.price * amount || amount <= 0}
              onClick={handleSubmit}
            >
              Comprar
            </Button>
            <Button
              color="neutral"
              type="submit"
              variant="contained"
              id="sell"
              disabled={amount > currentAsset.quantity || amount <= 0}
              onClick={handleSubmit}
            >
              Vender
            </Button>
          </>
        )}
      </OperationBox>
      {errorMessage
        && <Grow in={errorMessage}>
            <Alert variant='filled' severity="error" sx={{ m: 1 }}>{errorMessage}</Alert>
          </Grow>
      }
    </Paper>
  );
}
