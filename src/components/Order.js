import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  CardContent,
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
    setCurrentOperation,
  } = useContext(AppContext);

  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

    setCurrentAsset({});
    setIsLoading(false);
    setIsActionOpen(false);
    setCurrentOperation('');
  };

  return (
    <Paper
      component="form"
      sx={{
        m: 5,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 380,
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
            color={currentAsset.change >= 0 ? 'success' : 'error'}
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
        onChange={(event) => setAmount(event.target.value)}
      />
      <OperationBox>
        <Typography>Valor total:</Typography>
        <Typography variant="h5" color='primary' sx={{ fontWeight: 'bold' }}>
          {formatMoney(currentAsset.price * amount)}
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
              onClick={handleSubmit}
            >
              Comprar
            </Button>
            <Button
              color="neutral"
              type="submit"
              variant="contained"
              id="sell"
              onClick={handleSubmit}
            >
              Vender
            </Button>
          </>
        )}
      </OperationBox>
    </Paper>
  );
}
