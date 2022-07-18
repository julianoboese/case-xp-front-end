import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { getAsset, getAssets } from '../services/assets';
import { formatChange, formatMoney } from '../utils/format';
import Title from './Title';

export default function MyAssets() {
  const {
    setIsActionOpen, currentAsset, setCurrentAsset,
    setCurrentOperation,
  } = useContext(AppContext);

  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    async function fetchAssets() {
      const userAssets = await getAssets();

      setAssets(userAssets);
    }

    fetchAssets();
    setIsLoading(false);
  }, [currentAsset]);

  const handleGetAsset = async (assetId) => {
    setCurrentOperation('order');
    setIsActionOpen(true);
    const response = await getAsset(assetId);

    if (response.status === 401) {
      history.push('/');
    }

    setCurrentAsset(response);
  };

  return (
    <>
      {isLoading ? (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[900],
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto',
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Title>Meus Ativos</Title>
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.grey[900],
              px: 2,
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Grid container columnSpacing={3} rowSpacing={1} sx={{ py: 1 }}>
            <Grid item xs={6}>
            <Card
              sx={{
                bgcolor: (theme) => theme.palette.grey[700],
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                minWidth: 275,
              }}
            >
              <CardContent sx={{ py: 0.8, flexGrow: 1 }}>
                <Typography variant="h6" display="inline-block" width="30%">
                  Ativo
                </Typography>
                <Typography variant="h6" display="inline-block" width="24%">
                  Posição
                </Typography>
                <Typography variant="h6" display="inline-block" width="30%">
                  Valor atual
                </Typography>
                <Typography variant="h6" display="inline-block" width="16%">
                  Variação
                </Typography>
              </CardContent>
              <Box sx={{ width: '150px' }}/>
            </Card>
            </Grid>
            <Grid item xs={6}>
            <Card
              sx={{
                bgcolor: (theme) => theme.palette.grey[700],
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                minWidth: 275,
              }}
            >
              <CardContent sx={{ py: 0.8, flexGrow: 1 }}>
                <Typography variant="h6" display="inline-block" width="30%">
                  Ativo
                </Typography>
                <Typography variant="h6" display="inline-block" width="24%">
                  Posição
                </Typography>
                <Typography variant="h6" display="inline-block" width="30%">
                  Valor atual
                </Typography>
                <Typography variant="h6" display="inline-block" width="16%">
                  Variação
                </Typography>
              </CardContent>
              <Box sx={{ width: '150px' }}/>
            </Card>
            </Grid>
            {assets.sort((a, b) => a.assetId - b.assetId).map((asset) => (
              <Grid key={asset.assetId} item xs={6}>
              <Card
                sx={{
                  bgcolor: (theme) => theme.palette.grey[900],
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  minWidth: 275,
                }}
              >
                <CardContent sx={{ py: 1, flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    color="primary"
                    display="inline-block"
                    width="30%"
                  >
                    {asset.ticker}
                  </Typography>
                  <Typography variant="h6" display="inline-block" width="20%">
                    {asset.quantity}
                  </Typography>
                  <Typography variant="h6" display="inline-block" width="30%">
                    {formatMoney(asset.price)}
                  </Typography>
                  <Typography
                    color={asset.change >= 0 ? '#66bb6a' : 'error'}
                    display="inline-block"
                    width="20%"
                    variant="h6"
                  >
                    {formatChange(asset.change)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ ml: 2 }}>
                  <Button size="small" variant='contained'
                    sx={{ fontSize: '0.6rem', fontWeight: 'bold' }} onClick={() => handleGetAsset(asset.assetId)}>
                    Negociar
                  </Button>
                </CardActions>
              </Card>
              </Grid>
            ))}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
}
